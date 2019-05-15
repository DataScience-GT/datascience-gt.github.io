import * as Storage from "@google-cloud/storage";
import * as firebase from "firebase"
import * as entity from "./entity" 
import * as user from "./user" 


const db = firebase.firestore(); 
const storage = firebase.storage();
const rootref = storage.ref(); 

export const uploadFile = async function(file: Blob|File, name: string, location: string, callback: any) {
    const loc_ref = rootref.child(location + "/" + name); 
    let task = loc_ref.put(file); 
    task.on('complete', callback); 
}

export const uploadResume = async function(file: Blob|File, callback: any) {
    const current_uid = user.get_current_uid(); 
    const loc = current_uid + "/" + ""
}
