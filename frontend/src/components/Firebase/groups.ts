import * as entity from "./entity"; 
import Firebase from "./firebase";

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
        this._fbapp.user.get_user(curr_uid).then((document) => {
            if (document !== undefined) {
                document.groups.push(name); 
                this.db.collection('users').doc(curr_uid).set(document); 
            }
        })
        
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
                    this._fbapp.user.get_user(memberDocRef.id).then((newDoc:any) => {
                        if (document !== undefined) {
                            const new_groups = newDoc.groups.filter((value:any) => value !== name);
                            this.db.collection('users').doc(memberDocRef.id).update({groups: new_groups});
                        }
                    })

                })
                //delete each document 
                members.forEach((querySnapshot:any) => {
                    querySnapshot.ref.delete(); 
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
}