/**
 * This file provides the Group Api. This includes basic functions 
 * for managing groups, mostly related to creating, deleting, etc. 
 */
import Firebase from "./firebase";
import {firestore} from "firebase/app";


export default class GroupApi {
    db: any;
    auth: any;
    _fbapp: Firebase
    constructor(firebaseApp: Firebase) {
        this._fbapp = firebaseApp; 
        this.db = firebaseApp.db; 
    }

    /**
     * Get list of all groups. Really a wrapper around 
     * [[GroupApi.get_groups_and_members()]] 
     */
    async get_groups(){
        const docs: any = await this.get_groups_and_members(); 
        const mapped = docs.map((doc: { name: string; }) => doc.name); 
        return mapped;
    }

    /**
     * Get list of all groups AND members in the group. 
     */
    async get_groups_and_members() {
        const documents =  await this.db.collection('usergroups').get(); 
        return documents.docs.map((doc: { data: () => any; }) => doc.data()); 
    }
    /**
     * Creates a Group
     * Lets anyone create a group. Adds creating user to it by default. 
     * A few things happen to create a group. 
     * 1. A document is created under /usergroups with the document ID 
     * of the group name and the `name` member equal to the name of the group. 
     * 2. A collection is created under `/usergroups/{name}/members`. This will 
     * hold a document for each member in the group. A document is used so we can 
     * eventually extend functionality and have group owners/moderators if we want. 
     * 3. The calling user is added to the group
     *   - the group `name` is added to the array under `/users/{uid}/groups` 
     *   - the user document is created for this group under `/usergroups/{name}/members/{uid}`
     * 
     * 
     * @param name name of the group to create. 
     */
    create_group(name: string) {
        this.db.collection('usergroups').doc(name).set({name: name})
        this.db.collection('usergroups').doc(name).collection('members').doc(this._fbapp.user.get_current_uid()).set({}) 
        // add user to group 
        const curr_uid = this._fbapp.user.get_current_uid(); 
        // console.log(name)
        this.db.collection('users').doc(curr_uid).update({groups: firestore.FieldValue.arrayUnion(name)})
    }

    /**
     * Deletes a group. Automatically disassociates 
     * all members from this group. Member must be part of 
     * Membership | Group Member. 
     * 
     * This probably won't work if there are any join requests. This is a todo. 
     * TODO: Make this work with join requests. See issue #77 on ZenHub. 
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

    /**
     * Gets a list of all pending join requests. 
     * @param name Get the name of the group you want to view. 
     */
    getPendingRequests(name: string) {
        return this.db.collection('usergroups').doc(name).collection('join_requests').get()
    }
}