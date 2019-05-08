/**
 * Web API for project. 
 */

import * as entity from "./entity"; 

/**
 * New User Creation 
 */
export const createUser = function(user: entity.User, password: string) {
    //todo: 
    // firebase.auth().createUserWithEmailAndPassword(email, password).then((error, user) => {
        // if error - reject 
        // if not error - proceed with creation in DB 
        // use a blank User Entity 
    //})
}

/**
 * Verify user's payment status 
 */
export const verifyUserPayment = function(user: number, status: number, context: any) {
    // verify whether or not user has paid 
    /**
     * 0. Only proceed if context.auth.uid is in the Finance usergroup 
     * 1. Get user document from Firestore 
     * 2. If status = 0: Mark as suspended 
     * 3. If status = 1: mark as active-semester 
     * 4. If status = 2: mark as active-year 
     * 5. Someone's fucking with us. 
     */
}

/**
 * 
 * @param user The User ID generated via firebase
 * @param context The current authentication context. 
 */
export const suspendUser = function(user: number, context:any) {
    /**
     * 0. Only proceed if context.auth.uid in Membership 
     * 1. Get user document 
     * 2. Mark as suspended 
     * 3. Disable account on Firebase. 
     */
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
