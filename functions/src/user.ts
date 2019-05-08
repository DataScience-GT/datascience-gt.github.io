/**
 * Provides the User interface 
 */

// import * as admin from 'firebase-admin'; 
// import * as firebaseHelper from 'firebase-functions-helper'; 
import * as entity from "./entity"; 
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; 

admin.initializeApp(functions.config().firebase); 
const db = admin.firestore(); 

/**
 * userCreateAddInfo 
 * context: the firebase auth context 
 * data: the body of the form 
 */
const userCreateAddInfoFunction = async function(data: any, context: any) {
    // check context 
    if (context.email.slice(-10) !== "gatech.edu") {
        // return error 
        throw new functions.https.HttpsError('failed-precondition', "email is not a GT email"); 
    }
    else {
        let user:entity.User = {
            uid: context.auth.uid, 
            first_name: data.first_name,
            last_name: data.last_name,
            gt_email: data.gt_email,
            alt_email: data.alt_email, 
            phone_number: data.phone_number, 
            slack_id: "", 
            XP: 0, 
            resume_uri: "", 
            event_history: {
                workshop: [], 
                project: [], 
                gm: [], 
                other: []
            }, 
            groups: [], 
            qr_code: "", 
            creation_ts: +new Date(), 
            verified_ts: -1, 
            membership_status: entity.MembershipStatus.pending, 
            short_title: ""
        }; 
        const docRef = db.collection('users').doc(context.auth.uid); 
        await docRef.set(user); 
    };  
}

const onUserDeleteFunction = async function(data: any, context: any) {
    // get user 
    const uid = context.auth.uid; 
    if (uid === null) {
        throw new functions.https.HttpsError('unauthenticated', 'No User to Suspend'); 
    } else {
        const docRef = db.collection('users').doc(context.auth.uid); 
        await docRef.update({membership_status: entity.MembershipStatus.suspended}); 
    }
}

export const userCreateAddInfo = userCreateAddInfoFunction
export const onUserDelete = onUserDeleteFunction