import Firebase from "./firebase"; 
import * as firebase from "firebase"; 
import {Storage} from "@google-cloud/storage"; 
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
    
    async uploadFile(file: Blob|File, name: string, location: string, callback: any) {
        const loc_ref = this.rootref.child(location + "/" + name); 
        let task = loc_ref.put(file); 
        task.on('complete', callback); 
    }
    
    async uploadResume(file: Blob|File, callback: any) {
        const current_uid = this._fbapp.user.get_current_uid(); 
        const loc = current_uid + "/" + ""
    }   
}

export default FileApi; 
