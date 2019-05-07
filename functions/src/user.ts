/**
 * Provides the User interface 
 */

// import * as admin from 'firebase-admin'; 
// import * as firebaseHelper from 'firebase-functions-helper'; 
import * as bodyParser from "body-parser"
import * as express from "express"; 
import * as entity from "./entity"; 
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; 

admin.initializeApp(functions.config().firebase); 
const db = admin.firestore(); 



const userfunc = express(); 
const app = express.Router(); 

userfunc.use('/', app); 
userfunc.use(bodyParser.json()); 
userfunc.use(bodyParser.urlencoded({extended: false})) 

/**
 * Authentication for User Creation - Check Perms Here. 
 */
app.use((req, res, next) =>{
    console.log("Checking Perms...."); 
    //TODO: Check perms. 
    next(); 
})


/** 
 * Auto Trigger on User Create.  
 * @param req: The request 
 * @param res: The Response object
 */
app.post('/create', (req, res) => {
    // Perform validation 
    // Assume this is only triggered 
})

/**
 * Quick update of user with user id 
 */
app.get("/update/:uid", (req, res) => {
    res.send("Update user with user id.")
})

/**
 * userCreateAddInfo 
 * context: the firebase auth context 
 * data: the body of the form 
 */
let userCreateAddInfoFunction = function(data: any, context: any) {
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
        let docRef = db.collection('users').doc(context.auth.uid); 
        docRef.set(user); 
    };  
}

let onUserDeleteFunction = function(data: any, context: any) {
    // get user 
    let uid = context.auth.uid; 
    if (uid === null) {
        throw new functions.https.HttpsError('unauthenticated', 'No User to Suspend'); 
    } else {
        let docRef = db.collection('users').doc(context.auth.uid); 
        docRef.update({membership_status: entity.MembershipStatus.suspended}); 
    }
}

export const routedUser  = userfunc; 
export const userCreateAddInfo = userCreateAddInfoFunction
export const onUserDelete = onUserDeleteFunction