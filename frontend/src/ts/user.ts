/**
 * Web API for project. 
 */
import * as firebase from "firebase"
import * as entity from "./entity"; 

/**
 * New User Creation 
 */
const db = firebase.firestore(); 

export const get_current_uid = function() {
    let current_user_uid = firebase.auth().currentUser; 
    if (current_user_uid === null) {
        throw new Error('Must be signed in'); 
    }
    return current_user_uid.uid; 
}

export const createUser = async function(email: string, password: string, data: entity.User) {
    //create firebase user 
    //check string 
    if (email.slice(-11) !== '@gatech.edu') {
        throw new Error("Email validation failed"); 
    }
    let res = await firebase.auth().createUserWithEmailAndPassword(email, password); 
    // build it in database 
    if (res.user === null) {
        return null; 
    }
    try {
        let user:entity.User = {
            uid: res.user.uid, 
            first_name: data.first_name,
            last_name: data.last_name,
            gt_email: email,
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
        // Upload to db. 
        return db.collection('users').add(user); 
    } finally {
        return null;
    }
}

/**
 * Verify user's payment status 
 */
export const verifyUserPayment = async function(user: string, status: number, context: any) {
    // verify whether or not user has paid 
    /**
     * 0. Only proceed if context.auth.uid is in the Finance usergroup 
     * 1. Get user document from Firestore 
     * 2. If status = 0: Mark as suspended 
     * 3. If status = 1: mark as active-semester 
     * 4. If status = 2: mark as active-year 
     * 5. Someone's fucking with us. 
     */
    let current_user_uid = get_current_uid(); 
    // check the database for current user in 
    let snapshot:firebase.firestore.DocumentSnapshot; 
    try {
        snapshot = await db.collection('usergroups').doc('finance').collection('members').doc(current_user_uid).get()
        if (snapshot.exists) {
            let target_membership_status: entity.MembershipStatus; 
            if (status == 0) {
                target_membership_status = entity.MembershipStatus.suspended; 
            } else if (status === 1) {
                target_membership_status = entity.MembershipStatus.active_semester; 
            } else if (status === 2) {
                target_membership_status = entity.MembershipStatus.active_year; 
            } else {
                throw new Error("Incorrect status")
            }
            return db.collection('users').doc(user).update({
                membership_status: target_membership_status
            }) 
        }
    } 
    finally {
       // nothing to do  
    }   
}

const call_cloud_disable_function = function(user:string) {
    // TODO: Create a cloud function to disable user
}
/**
 * 
 * @param user The User ID generated via firebase
 * @param context The current authentication context. 
 */
export const suspendUser = async function(user: string, context:any) {
    /**
     * 0. Only proceed if context.auth.uid in Membership 
     * 1. Get user document 
     * 2. Mark as suspended 
     * 3. Disable account on Firebase.
     */
    let current_user_uid = get_current_uid(); 
    try {
        let res1 = call_cloud_disable_function(user); 
        let res2 = db.collection('users').doc(user).update({
            membership_status: entity.MembershipStatus.suspended
        })
        await res1; 
        await res2; 
    } finally {
        // nothing to do finally. 
    }
}

export const takePhotoAndCheckUserIn = function(event: number, context: any) {
    /**
     * Only proceed if context in Membership or External Affairs or Workshop
     * 1. Use camera to get photo 
     * 2. AJAX POST to cloud function 
     * 3. Cloud function handles it. 
     */
}


export const checkInUser = function(user: number, event: number, context: any) {
    // check in a user with number. 
    // get user doc and update, 
    // get event doc and update. 
}

/**
 * Generic Update to the User Document. It's faster to use a specified one. 
 * @param userUpdate The generic user update document. Should contain UID. 
 * @param context The current authentication context. 
 */
export const updateUserDocument = function(userUpdate: any, context:any) {
    /**
     * 0. Only proceed if context.auth.uid == userUpdate.uid || context.auth.uid in Membership group
     * 1. Get user document 
     * 2. Match which fields exist in the User entity 
     * 3. Set those fields to update in Firestore. 
     */
}
