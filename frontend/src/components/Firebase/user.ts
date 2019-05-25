/**
 * Web User API for Firebase 
 * Following Singleton model as expected from a tutorial online
 * Instantiate with a firebase app instance - will use that 
 */
import Firebase from "./firebase"; 
import * as entity from "./entity"; 
import firebase, { firestore } from "firebase";

/**
 * Provides the entirety of the User API Functionality  
 */
class UserApi {
    firebase: typeof firebase;
    db: firestore.Firestore;  
    auth: firebase.auth.Auth;
    _fbapp: Firebase;
    constructor(firebaseApp: Firebase) {
        this._fbapp = firebaseApp; 
        this.firebase = firebaseApp.app; 
        this.db = firebaseApp.db; 
        this.auth = this.firebase.auth(); 
        this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }
    /**
     * Gets the UID of the user who is currently authenticated 
     */
    get_current_uid() {
        let current_user_uid = this.auth.currentUser; 
        if (current_user_uid === null) {
            throw new Error("must be signed in"); 
        }
        return current_user_uid.uid; 
    }
    async check_perms(uid: string, group: string): Promise<boolean>{
        // check pending first 
        let user_setting = ((await this.db.collection('users').doc(uid).get()).data() as entity.User).membership_status; 
        // if (user_setting === entity.MembershipStatus.pending || 
        //     user_setting === entity.MembershipStatus.suspended) {
        //     return false; 
        // } else {
            let snapshot = await this.db.collection('usergroups').doc(group).collection('members').doc(uid).get()
            if (snapshot.exists) {
                return true; 
            } 
            return false; 
        // }
    }
    /**
     * Returns the data file for a specific user. 
     * @param uid The user ID to request 
     */
    async get_user(uid:string){
        let doc = await this.db.collection("users").doc(uid).get(); 
        return await doc.data(); 
    }
    /**
     * Performs a sign-in procedure and returns the result of the promise 
     * @param email The sign-up email
     * @param password The password 
     */
    async sign_in(email:string, password:string) {
        return await this.auth.signInWithEmailAndPassword(email, password); 
    }

    /**
     * Creates a user by first signing up with firebase, and upon success, 
     * creating a [[entity.User]] entry in our database at the /users endpoint. 
     * @param email GT Email
     * @param password password
     * @param first_name First Name
     * @param last_name Last Name
     * @param alt_email Alternative Email (i.e. Gmail, etc)
     * @param phone_number Phone number 
     */
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
                profile_pic: "", 
                interests: [],
                groups: [],
                qr_code: "",
                creation_ts: +new Date(), 
                verified_ts: -1, 
                membership_status: entity.MembershipStatus.pending, 
                short_title: "", 
                verification_uri: ""
            }; 
            // Upload to db. 
            return this.db.collection('users').doc(res.user.uid).set(user); 
        } finally {
            return null;
        }
    }

    /**
     * Updates a user's verification status. 
     * 
     * @param option How the user will pay. Options: 
     *  - 0: Defer payment (does nothing)
     *  - 1: Cash 
     *  - 2: Venmo (file param required)
     * @param file The file/blob to upload. Required if option is venmo.
     * @param fname The name of the file. 
     */
    async updateUserVerification(option: number, file?: File|Blob, fname?: string) {
        if (option === 0) {
            // pass 
        } else if (option === 1) {
            return this.db.collection('users').doc(this.get_current_uid()).update({"verification_uri": "cash"});
        } else if (option === 2) {
            if (!file) {
                throw Error("File argument cannot be null if option is 2"); 
            }
            if (!fname) {
                throw Error("File name argument cannot be null if option is 2"); 
            }
            const snapshot = await this._fbapp.file.uploadVerification(file, fname);
            const download_url = (await snapshot.ref.getDownloadURL()) as string;  
            return this.db.collection('users').doc(this.get_current_uid()).update({"verification_uri": download_url});
        }
    }

    async getPendingUsers(): Promise<entity.User[] | undefined> {
        // only let membership & finance access this 
        let perm1 = await this.check_perms(this.get_current_uid(), "finance"); 
        let perm2 = await this.check_perms(this.get_current_uid(), "membership"); 
        console.log(await this.get_user(this.get_current_uid()));
        console.log(perm1, perm2); 
        if (perm1 || perm2) {
            let query = await this.db.collection('users').where("membership_status", "==", entity.MembershipStatus.pending).get(); 
            let user_docs:entity.User[] = query.docs.map(data => {
                return data.data() as entity.User; 
            });  
            return user_docs; 
        } 
    }
    /**
     * Verify user's payment status. Only allows people within Finance to do this action. 
     * @param user The string UID 
     * @param status: Whether or not to verify. 
     *   0. Mark as suspended 
     *   1. Mark as active-semester 
     *   2. Mark as active-year 
     */
    async verifyUserPayment(user: string, status: string) {
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
                if (status === "0") {
                    target_membership_status = entity.MembershipStatus.suspended; 
                } else if (status === "1") {
                    target_membership_status = entity.MembershipStatus.active_semester; 
                } else if (status === "2") {
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

    /**
     * Calls a cloud fundtion (to be made) that can has 
     * elevated permissions to disable a user account. This is only done 
     * All checks are done on the server-side for security; firebase handles
     * all authentication context transfer. 
     * @param user The uid for the user to disable
     */
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
    /**
     * 
     * @param user The UID of selected user 
     * @param groups An array of group names to add the user to. Get list ov 
     * available groups through [[Groups.get_groups]]
     */
    async addUserToGroups(user: string, groups: Array<string>) {
        // first get permission from membership - maybe there should be a group owner eventually 
        let current_user_id = this.get_current_uid(); 
        let snapshot = await this.db.collection('usergroups').doc('membership').collection('members').doc(current_user_id).get()
        if (snapshot.exists) {
            // add it to the user doc 
            // convert groups to array format 
            let promises: Promise<void>[] = []; 
            groups.forEach(element => {
                // update it in the correct group doc 
                // we don't /need/ to wait for completion. 
                promises.push(this.db.collection('usergroups').doc(element).collection("members").doc(user).set({})); 
            });
            await this.db.collection('users').doc(user).update({groups: firestore.FieldValue.arrayUnion(groups)});
            //wait for completion 
            await promises; 
            return true; 
        }
        return false; 
    }
    /**
     * Submit a request to join a group. 
     * 
     * @param name Name of group to join 
     * @param reason Reason for joining. 
     */
    async requestJoinGroup(name: string, reason: string) {
        const curr_uid = this.get_current_uid(); 
        const curr_user = (await this.get_user(curr_uid)) as entity.User; 
        this.db.collection('usergroups').doc(name).collection('join_requests').doc(curr_uid).set({
            user: curr_uid, 
            first_name: curr_user.first_name, 
            last_name: curr_user.last_name, 
            reason: reason
        })
    }

    /**
     * 
     * @param name Name of group 
     * @param uid Uid of requesting user
     * @param response 
     */
    async respondToJoinRequest(name: string, uid: string, response: number) {
        // Perms require membership in group, or membership chair 
        const perm1 = this.check_perms(this.get_current_uid(), "membership"); 
        const perm2 = this.check_perms(this.get_current_uid(), name); 
        if (await perm1 || await perm2) {
            // approve & add 
            if (response === 1) {
                this.db.collection('usergroups').doc(name).collection('members').doc(uid).set({}); 
                this.db.collection('users').doc(this.get_current_uid()).update({groups: firestore.FieldValue.arrayUnion(name)})     
            }
            // no matter what, just delete the request 
            this.db.collection('usergroups').doc(name).collection('join_requests').doc(uid).delete(); 
        }
    }

    /**
     * Removes user from a set of groups. This removal happens in no particular order. 
     * If the user is not in a group specified in the groups parameter, it ignores it 
     * silently. Use [[User.get_user]] to get the user doc, which includes a list of groups. 
     * 
     * @param user The string of the user 
     * @param groups The list of groups the user is to be removed from. 
     */
    async removeUserFromGroups(user:string, groups: Array<string>) {
        // check perms 
        let perm:boolean = await this.check_perms(this.get_current_uid(), "membership"); 

        if (perm) {
            // start the update operation 
            const comp_promise = this.db.collection('users').doc(user).update({groups: firestore.FieldValue.arrayRemove(groups)});
            // delete from groups 
            groups.forEach(element => {
                this.db.collection("usergroups").doc(element).collection("members").doc(user).delete(); 
            })
            await comp_promise; 
            return true; 
        }
        return false; 

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

