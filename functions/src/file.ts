/** 
 * File management & control functions 
 * 
 */

import * as entity from "./entity"; 
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'; 
import * as Storage from "@google-cloud/storage";


/**
 * Database for accessing user 
 */
admin.initializeApp(functions.config().firebase); 
const db = admin.firestore(); 
const bucket = admin.storage().bucket('user-files'); 

/**
 * 
 * @param data The data with a reference body that contains the file ref. 
 * @param context Authentication context. 
 */
export const retrieveFile = async function (data: any, context: any) {
    // just dumb-returns a File object, that can be gotten by the file.get() or download method. 
    return {"file_reference": bucket.file(data.reference)}; 
}


/**
 * Retrieve User Resume 
 */
export const retrieveUserResumeFunction = async function (data: any, context:any) {
    // retrieve UID 
    const uid = context.auth.uid; 
    // get this document from the database 
    const userDoc = db.collection('users').doc(uid); 
    const getDoc = await userDoc.get()
    
    if (!getDoc.exists) {
        throw new functions.https.HttpsError('unavailable', 'Requested User was Unavailable'); 
    } else {
        const reference = (getDoc.data() as entity.User).resume_uri; 
        if (reference.slice(2) === "::") {
            // cloud storage reference
            // retrieve from storage 
            let result:Storage.File = bucket.file(reference); 
            return {"file_reference": result}; 
        } else {
            return {"url_reference": reference}; 
        }
    }
}
 

