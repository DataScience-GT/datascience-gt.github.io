import * as entity from "./entity"; 
import Firebase from "./firebase";
import { firestore } from "firebase";


export default class GroupApi {
    db: any;
    auth: any;
    _fbapp: Firebase
    constructor(firebaseApp: Firebase) {
        this._fbapp = firebaseApp; 
        this.db = firebaseApp.db; 
    }
    /**
     * Get list of all groups 
     */
    async get_groups(){
        const docs:any = await this.get_groups_and_members(); 
        const mapped = docs.map((doc: { name: string; }) => doc.name); 
        return mapped;
    }

    async get_groups_and_members() {
        const documents =  await this.db.collection('usergroups').get(); 
        return documents.docs.map((doc: { data: () => any; }) => doc.data()); 
    }
    /**
     * Creates a Group
     * Lets anyone create a group. Adds creating user to it by default. 
     * 
     * @param name name of the group to create. 
     */
    create_group(name: string) {
        this.db.collection('usergroups').doc(name).set({name: name})
        this.db.collection('usergroups').doc(name).collection('members').doc(this._fbapp.user.get_current_uid()).set({}) 
        // add user to group 
        const curr_uid = this._fbapp.user.get_current_uid(); 
        console.log(name)
        this.db.collection('users').doc(curr_uid).update({groups: firestore.FieldValue.arrayUnion(name)})
    }

    /**
     * Deletes a group. Automatically disassociates 
     * all members from this group. Member must be part of 
     * Membership | Group Member 
     * 
     * @param name Name of group to delete.
     */
    async delete_group(name: string) {
        const curr_uid = this._fbapp.user.get_current_uid(); 
        const perm1 = await this._fbapp.user.check_perms(curr_uid, name); 
        const perm2 = await this._fbapp.user.check_perms(curr_uid, "membership"); 
        if (perm1 || perm2) {
            let individualRemovalPromise = this.db.collection('usergroups').doc(name).collection('members').get().then((members: any) => {
                // for each member in here, update their document to not include this group 
                members.docs.forEach((memberDocRef:any) => {
                    this.db.collection('users').doc(memberDocRef.id).update({groups: firestore.FieldValue.arrayRemove(name)}); 
                    memberDocRef.ref.delete(); 
                })
            });
            await individualRemovalPromise; 
            // delete the group itself 
            this.db.collection('usergroups').doc(name).delete(); 
        }
        else {
            return false; 
        }
    }

    getPendingRequests(name: string) {
        return this.db.collection('usergroups').doc(name).collection('join_requests').get()
    }

}