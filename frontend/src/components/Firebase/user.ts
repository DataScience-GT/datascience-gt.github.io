/**
 * Web User API for Firebase 
 * Following Singleton model as expected from a tutorial online
 * Instantiate with a firebase app instance - will use that 
 */
import Firebase from "./firebase"; 
import * as entity from "./entity"; 
import firebase from "firebase";

/**
 * New User Creation 
 */

class UserApi {
    firebase: Firebase["app"];
    db: Firebase["db"];  
    auth: firebase.auth.Auth;
    constructor(firebaseApp: Firebase) {
        this.firebase = firebaseApp.app; 
        this.db = firebaseApp.db; 
        this.auth = this.firebase.auth(); 
        this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
    get_current_uid() {
        let current_user_uid = this.auth.currentUser; 
        if (current_user_uid === null) {
            throw new Error("must be signed in"); 
        }
        return current_user_uid.uid; 
    }
   
    async get_user(uid:string){
        let doc = await this.db.collection("users").doc(uid).get(); 
        return await doc.data(); 
    }
    async sign_in(email:string, password:string) {
        return await this.auth.signInWithEmailAndPassword(email, password); 
    }
    async createUser(email: string, password: string, 
        first_name: string, 
        last_name: string, 
        alt_email: string, 
        phone_number: string) {
        //create firebase user 
        //check string 
        if (email.slice(-11) !== '@gatech.edu') {
            throw new Error("Email validation failed"); 
        }
        let res = await this.auth.createUserWithEmailAndPassword(email, password); 
        // build it in database 
        if (res.user === null) {
            return null; 
        }
        try {
            let user:entity.User = {
                uid: res.user.uid, 
                first_name: first_name,
                last_name: last_name,
                gt_email: email,
                alt_email: alt_email, 
                phone_number: phone_number, 
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
            return this.db.collection('users').doc(res.user.uid).set(user); 
        } finally {
            return null;
        }
    }

    /**
     * Verify user's payment status 
     */
    async verifyUserPayment(user: string, status: number, context: any) {
        // verify whether or not user has paid 
        /**
         * 0. Only proceed if context.auth.uid is in the Finance usergroup 
         * 1. Get user document from Firestore 
         * 2. If status = 0: Mark as suspended 
         * 3. If status = 1: mark as active-semester 
         * 4. If status = 2: mark as active-year 
         * 5. Someone's fucking with us. 
         */
        let current_user_uid = this.get_current_uid(); 
        // check the database for current user in 
        let snapshot:firebase.firestore.DocumentSnapshot; 
        try {
            snapshot = await this.db.collection('usergroups').doc('finance').collection('members').doc(current_user_uid).get()
            if (snapshot.exists) {
                let target_membership_status: entity.MembershipStatus; 
                if (status === 0) {
                    target_membership_status = entity.MembershipStatus.suspended; 
                } else if (status === 1) {
                    target_membership_status = entity.MembershipStatus.active_semester; 
                } else if (status === 2) {
                    target_membership_status = entity.MembershipStatus.active_year; 
                } else {
                    throw new Error("Incorrect status")
                }
                return this.db.collection('users').doc(user).update({
                    membership_status: target_membership_status
                }) 
            }
        } 
        finally {
        // nothing to do  
        }   
    }
    private call_cloud_disable_function(user:string) {
        // TODO: Create a cloud function to disable user
    }
    /**
     * 
     * @param user The User ID generated via firebase
     * @param context The current authentication context. 
     */
    async suspendUser(user: string, context:any) {
        /**
         * 0. Only proceed if context.auth.uid in Membership 
         * 1. Get user document 
         * 2. Mark as suspended 
         * 3. Disable account on Firebase.
         */
        let current_user_uid = this.get_current_uid(); 
        let snapshot = await this.db.collection('usergroups').doc('membership').collection('members').doc(current_user_uid).get()
        if (snapshot.exists) {
            try {
                let res1 = this.call_cloud_disable_function(user); 
                let res2 = this.db.collection('users').doc(user).update({
                    membership_status: entity.MembershipStatus.suspended
                })
                await res1; 
                await res2; 
            } finally {
                // nothing to do finally. 
            }
        }
    }


    takePhotoAndCheckUserIn(event: number, context: any) {
        /**
         * Only proceed if context in Membership or External Affairs or Workshop
         * 1. Use camera to get photo 
         * 2. AJAX POST to cloud function 
         * 3. Cloud function handles it. 
         */
    }


    checkInUser(user: number, event: number, context: any) {
        // check in a user with number. 
        // get user doc and update, 
        // get event doc and update. 
    }

    /**
     * Generic Update to the User Document. It's faster to use a specified one. 
     * @param userUpdate The generic user update document. Should contain UID. 
     * @param context The current authentication context. 
     */
    async updateUserDocument(userUpdate: any, context:any) {
        /**
         * 0. Only proceed if context.auth.uid == userUpdate.uid || context.auth.uid in Membership group
         * 1. Get user document 
         * 2. Match which fields exist in the User entity 
         * 3. Set those fields to update in Firestore. 
         */
    }
}

export default UserApi; 
