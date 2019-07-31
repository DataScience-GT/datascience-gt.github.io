/**
 * Web User API for Firebase 
 * Following Singleton model as expected from a tutorial online
 * Instantiate with a firebase app instance - will use that 
 */
import Firebase from "./firebase"; 
import * as entity from "./entity"; 
import {firestore, auth, functions} from "firebase/app";

/**
 * @author Vidhur Kumar
 */
class EventApi {
    db: firebase.firestore.Firestore;
    firebaseApp: Firebase;
    functions: firebase.functions.Functions;
    auth: firebase.auth.Auth;


    /**
     * 
     * @param firebaseApp 
     */
    constructor(firebaseApp: Firebase) {
        this.firebaseApp = firebaseApp;
        this.db = firebaseApp.db;
        this.functions = this.firebaseApp.app.functions();
        this.auth = firebaseApp.app.auth();
    }

    /**
     * 
     */
    async get_events() {
        // let events = [];
        return await this.db.collection("events").get();
        //     snapshot.docs.forEach(doc => {
        //         events.push({id: doc.id, data: doc.data()});
        //     });
        // });
    }

    /**
     * 
     * @param id 
     */
    async get_event(id: string) {
        // return await this.db.collection("events").doc(id).get();
    }

    /**
     * 
     * @param name 
     * @param desc 
     * @param date 
     * @param type 
     * @param owner 
     */
    async create_event(name: string, desc: string, date: Date, type: string, owner: entity.User) {
        let newEventRef = this.db.collection("events").doc();

        return newEventRef.set({
            name: name,
            desc: desc,
            date: date,
            type: type,
            owner: owner,
            rsvp_list: []
        });
    }

    /**
     * 
     * @param uid 
     */
    async delete_event(uid: string) {

    }

    /**
     * Adds the specified user to the RSVP list of the event
     * with the specified uid.
     * 
     * TODO: Add user validation for specific type of events 
     * if needed.
     * @param uid
     * @param user 
     */
    async rsvp_to_event(uid: string, user: entity.User) {
        let eventRef = this.db.collection("events").doc(uid);

        eventRef.update({
            rsvp_list: firestore.FieldValue.arrayUnion(user)
        });
    }
}

export default EventApi;