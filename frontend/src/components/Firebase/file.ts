import Firebase from "./firebase"; 
import * as firebase from "firebase"; 
// import {Storage} from "@google-cloud/storage"; 
import * as entity from "./entity" 
import * as user from "./user" 


class FileApi {
    db: firebase.firestore.Firestore;  
    storage: firebase.storage.Storage; 
    rootref: firebase.storage.Reference; 
    firebase: typeof firebase;
    _fbapp: Firebase;
    constructor(firebaseApp: Firebase) {
        this._fbapp = firebaseApp; 
        this.firebase = firebaseApp.app; 
        this.db = firebaseApp.db; 
        this.storage = this.firebase.storage(); 
        this.rootref = this.storage.ref(); 
    }

    /**
     * Generic upload service. Please use wrapper methods if possible. 
     *
     * @param file The Blob or File API File (or bytes array)
     * @param name The name of the file 
     * @param metadata Any associated metadata
     * @param location Where to save the file. No / necessary.
     */
    uploadFile(file: Blob|File, name: string, metadata: any, location: string) {
        const loc_ref = this.rootref.child(location + "/" + name); 
        return loc_ref.put(file, metadata); 
    } 

    /**
     * Uploads a user's resume 
     * @param file The data itself 
     * @param name The name of the resume  
     */
    uploadResume(file: Blob|File, name: string) {

    }

    /**
     * Uploads a user's payment verification 
     * @param file The screenshot data 
     */
    uploadVerification(file: Blob|File, name: string) {
        let location = this._fbapp.user.get_current_uid() + "/verification";
        return this.uploadFile(file, "verification_" + name, {}, location); 
    }
}

export default FileApi; 
