require('cors')({ origin: true });
import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import {google, sheets_v4} from "googleapis"

import {api_key, service_creds, sheet} from "./creds"
const apiKey = api_key.key; 
const jwt = new google.auth.JWT(service_creds.client_email, undefined, service_creds.private_key, ["https://www.googleapis.com/auth/spreadsheets"]); 


admin.initializeApp(functions.config().firebase); 
const db = admin.firestore(); 
enum MembershipStatus {
    pending, 
    active_semester, 
    active_year, 
    suspended, 
}


//borrowed check perms
async function check_perms(uid: string, group: string): Promise<boolean>{
    // check pending first 
    const user_setting = (((await db.collection('users').doc(uid).get()).data()) as any).membership_status; 
    if (user_setting === MembershipStatus.pending || 
        user_setting === MembershipStatus.suspended) {
        return false; 
    } else {
        const snapshot = await db.collection('usergroups').doc(group).collection('members').doc(uid).get()
        if (snapshot.exists) {
            return true; 
        } 
        return false; 
    }
}
async function get_user(uid:string){
    const doc = await db.collection("users").doc(uid).get(); 
    return await doc.data(); 
}
/**
 * Verifies a user. Performs several actions: 
 * - Adds to accounting spreadsheet 
 * - Adds to spreadsheet of verified users (for slack/record keeping purposes)
 * 
 * @param data Data should include a JSON object describing relevant details about the user. 
 * Contract: 
 * ```ts
 * {
    *  "uid": string, //UID of user 
    *  "amount": number // Amount paid 
    *  "is_cash": boolean  //Whether or not this was a cash payment vs venmo. True=Cash
    * }
    * ```
    * @param context The authentication context for this call
    */
export const onUserVerify = async function(data: any, context: any): Promise<any> {
    // verify authorization of this user 
    console.info("Triggered User Verification authorized by ", context.auth); 
    console.info("Writing Transaction", data); 
    if (!(await check_perms(context.auth.uid, "finance"))) {
        console.warn("Unauthorized access attempt")
        return {
            "error": "calling user is not authorized"
        }
    } else {
        // bet. Lets go. write to gooogle sheets 
        const financeSpreadsheet = sheet.sheet_id; 
        const sheets = google.sheets({version: "v4"})
        //generate write in "ledger": 
        const date = new Date() 
        const dd = date.getDate(); 
        const mm = date.getMonth(); 
        const yyyy = date.getFullYear(); 
        const datestring = "".concat(mm < 10 ? "0" + String(mm) : String(mm), "/",
            dd < 10 ? "0" + String(dd) : String(dd), "/",
            String(yyyy)); 

        const VenmoLedgerPromise =  sheets.spreadsheets.values.append({
            spreadsheetId: financeSpreadsheet, 
            range: sheet.ledger_sheet + "!A1:D1", 
            auth: jwt, 
            key: apiKey, 
            valueInputOption: "USER_ENTERED", 
            resource: {values: [[datestring, "Dues Payment", "Dues", data.amount]]}
        } as sheets_v4.Params$Resource$Spreadsheets$Values$Append)

        const userdoc: any = await get_user(data.uid); 
        const DuesLedgerPromise = sheets.spreadsheets.values.append({
            spreadsheetId: financeSpreadsheet, 
            range: sheet.dues_sheet + "!A1", 
            auth: jwt, 
            key: apiKey, 
            valueInputOption: "USER_ENTERED", 
            resource: {values: [[userdoc.gt_email, userdoc.uid, data.amount, datestring]]}
        } as sheets_v4.Params$Resource$Spreadsheets$Values$Append)
        await VenmoLedgerPromise; 
        await DuesLedgerPromise; 
    }
} 

export const onUserVerifyDummy = function(data: any, context: any) {
    return {data: data}; 
}