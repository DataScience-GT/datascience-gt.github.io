/**
 * Provies the basics of file management. Has some scripts to 
 * support special, common uploads such as Venmo and Resume. 
 * This should be the POC for all google cloud storage functionality. 
 */
import Firebase from "./firebase"; 



class FileApi {
    db: firebase.firestore.Firestore;  
    storage: firebase.storage.Storage; 
    rootref: firebase.storage.Reference; 
    _fbapp: Firebase;
    constructor(firebaseApp: Firebase) {
        this._fbapp = firebaseApp; 
        this.db = firebaseApp.db; 
        this.storage = firebaseApp.app.storage(); 
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
        let location = this._fbapp.user.get_current_uid() + "/resume";
        return this.uploadFile(file, "resume_" + name, {}, location);
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
