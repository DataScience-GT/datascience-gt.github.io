/**
 * Web User API for Firebase 
 * Following Singleton model as expected from a tutorial online
 * Instantiate with a firebase app instance - will use that 
 */
import Firebase from "./firebase"; 
import * as entity from "./entity"; 
import {firestore, auth, functions} from "firebase/app";

class EventApi {
    db: firebase.firestore.Firestore;
    firebaseApp: Firebase;
    functions: firebase.functions.Functions;
    auth: firebase.auth.Auth;


    constructor(firebaseApp: Firebase) {
        this.firebaseApp = firebaseApp;
        this.db = firebaseApp.db;
        this.functions = this.firebaseApp.app.functions();
        this.auth = firebaseApp.app.auth();
    }

    async get_events() {
        return await this.db.collection("events").get();
    }

    async get_event(uid: string) {
        return await this.db.collection("events").doc(uid).get();
    }

    async create_event(name: string, desc: string, date: Date, type: string) {
        let newEventRef = this.db.collection("events").doc();

        return newEventRef.set({
            name: name,
            desc: desc,
            date: Date,
            type: type,
            rsvp_list: []
        });
    }


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