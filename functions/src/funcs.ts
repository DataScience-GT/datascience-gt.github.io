require('cors')({ origin: true });
/**
 * Includes google cloud functions. For laziness, 
 * some things from the web-api are duplicated here, including the 
 * - `check_perms` function from `components/Firebase/user`
 * - `MembershipStatus` enum from `components/Firebase/entity`
 * - `get_user` function from `components/Firebase/user` 
 * 
 * If those ever change, you should probably change them here too. That being said, 
 * I doubt that those will ever change. 
 */

 /** Magically allow CORS. 
  * 
  * TODO: Fix this. Migrate function to our domain and only allow 
  * same-origin requests. Makes testing a bitch so for dev purposes, 
  * this is left here. See issue #80. 
  */

 /*

import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import {google, sheets_v4} from "googleapis"

import {api_key, service_creds, sheet} from "./creds";
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

/*
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
        const userdoc: any = await get_user(data.uid); 

        /**
         * This part writes to the Ledger sheet. 
         
        const VenmoLedgerPromise =  sheets.spreadsheets.values.append({
            spreadsheetId: financeSpreadsheet, 
            range: sheet.ledger_sheet + "!A1:D1", 
            auth: jwt, 
            key: apiKey, 
            valueInputOption: "USER_ENTERED", 
            resource: {values: [[datestring, "Dues " + userdoc.gt_email, "Dues", data.amount]]}
        } as sheets_v4.Params$Resource$Spreadsheets$Values$Append)

        /**
         * This part writes to the Dues sheet. 
         
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

/**
 * Dummy function for testing purposes, to make sure the frontend works right 
 * and that we don't spam the main budget sheet. 
 * @param data Same as above
 * @param context Same as above
 
export const onUserVerifyDummy = function(data: any, context: any) {
    return {status: "success", data: data}; 
}

/**
 * 
 
export const scheduledEventXPDistribution = () => {
    const events: any = get_events();

    events.forEach(event => {
        if(new Date(event.data.date) < new Date() && !event.data.xpAdded) {
            const rsvp_list = event.data.rsvp_list;
            if(rsvp_list.length > 0) {
                rsvp_list.forEach(user => {
                    const id: any = get_user_from_name(user.split(" ")[0], user.split(" ")[1])
                    add_eventXP_to_user(id, event.id, event.data.XP)
                        .then(() => {
                            console.log('Successfully added event XP to user.')
                        })
                        .catch((err) => {
                            console.log('Error updating user event XP: ' + err);
                        })
                });
            }
            mark_event_xpAdded(event.id)
                .then(() => {
                    console.log('Successfully marked event XP flag.')
                })
                .catch((err) => {
                    console.log('Error updating event XP flag: ' + err);
                });
        }
    })
};

/**
 * 
 * @param uid 
 * @param eventId 
 * @param eventXP 
 
async function add_eventXP_to_user(uid: string, eventId: string, eventXP: number) {
    const userRef = await db.collection('users').doc(uid);
    userRef.update({
        XP: admin.firestore.FieldValue.increment(eventXP),
        xp_history: admin.firestore.FieldValue.arrayUnion({id: eventId, xp: eventXP}),
    })
    .then(() => {
        console.log('Successfully updated user event XP')
    })
    .catch((err) => {
        console.log('Error updating user event XP: ' + err);
    })

    // let userRef = await this.db.collection('users').doc(uid);

}

/**
 * 
 * @param id 
 
async function mark_event_xpAdded(id: string) {
    const eventRef = db.collection("events").doc(id);
    return eventRef.update({
        xpAdded: true
    })
    .then(() => {
        console.log('Successfully updated event.')
    })
    .catch((err) => {
        console.log(err);
    })
}

/**
 * 
 * @param first_name 
 * @param last_name 
 
async function get_user_from_name(first_name: string, last_name: string) {
    let id;
    await db.collection('users')
        .where('first_name', '==', first_name)
        .where('last_name', '==', last_name)
        .get()
        .then(snapshot => {
            if(snapshot.empty) {
                return null;
            }

            if(snapshot.docs.length > 1) {
                throw new Error("More than one user found with the same first name and the last name");
            }

            id = snapshot.docs[0].id;
            return id;
        })
        .catch((err) => {
            console.log(err);
            return null;
        })

}

/**
 * 
 
async function get_events() {
    const events: any = [];
    await db.collection('events').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(!doc.data().xpAdded) {
                events.push({id: doc.id, data: doc.data()});
            }
        })
    })

    return events;
}

*/
export {}