/**
 * Web User API for Firebase 
 * Following Singleton model as expected from a tutorial online
 * Instantiate with a firebase app instance - will use that 
 */
import Firebase from "./firebase"; 
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
        return await this.db.collection("events").get();
    }

    /**
     * 
     * @param id 
     */
    async get_event(id: string) {
        return await this.db.collection("events").doc(id).get();
    }

    /**
     * 
     * @param name 
     * @param desc 
     * @param date 
     * @param type 
     * @param owner 
     */
    async create_event(name: string, desc: string, XP: number, date: Date, type: string, owner: string, meetingLink: string,  resourceLink: string) {
        let newEventRef = this.db.collection("events").doc();
        return newEventRef.set({
            name: name,
            desc: desc,
            XP: XP,
            date: date,
            type: type,
            owner: owner,
            isOpen: false,
            links: [ meetingLink, resourceLink],
            code: Math.floor(Math.random() * (9999 - 1000)) + 1000,
            attendee_list: []
        });
    }

    /**
     * 
     * @param id 
     */
    async delete_event(id: string) {
        await this.db.collection('events').doc(id).delete()
            .then(() => {
                console.log('Event successfully deleted')
            })
            .catch((err) => {
                console.log(err);
            })
    }

    /**
     * Deletes all events in the master list.
     * WARNING: Do not use on the main database.
     */
    async delete_events() {
        await this.db.collection('events').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.delete_event(doc.id);
            })
        })
    }

    /**
     * 
     * @param id 
     * @param name 
     * @param desc 
     * @param XP 
     * @param date 
     * @param type 
     * @param owner
     */
    async update_event(id: string, name: string, desc: string, XP: number, date: Date, meetingLink: string, resourceLink: string, type: string, owner: string) {
        let eventRef = this.db.collection("events").doc(id);
        return eventRef.update({
            name: name,
            desc: desc,
            XP: XP,
            date: date,
            links: [meetingLink, resourceLink],
            type: type,
            owner: owner
        })
        .then(() => {
            console.log('Successfully updated event.')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    /**
     * Opens up an event for members to sign in using the 4 digit code that was generated.
     * @param id 
     */
    async open_event(id: string) {
        let eventRef = this.db.collection("events").doc(id);
        return eventRef.update({
            isOpen: true
        });
    }

    /**
     * 
     * @param id 
     * @param name 
     */
    async add_to_event_attendee_list(id: string, name: string) {
        let eventRef = this.db.collection("events").doc(id);
        return eventRef.update({
            attendee_list: firestore.FieldValue.arrayUnion(name)
        });
    }

    async mark_event_xpAdded(id: string) {
        let eventRef = this.db.collection("events").doc(id);
        return eventRef.update({
            xpAdded: true
        })
        .then(() => {
            console.log('Successfully updated event.')
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async distribute_event_XP(id: string) {
        let eventRef = this.db.collection("events").doc(id);
        eventRef.get().then(snapshot => {
            console.log(snapshot.data());
            return snapshot.data();
        })
    }

    /**
     * Utility function to add a particular field to every event if necessary.
     */
    async add_field_to_event() {
        await this.db.collection('events').get().then(snapshot => {
            snapshot.docs.forEach(async doc => {
                let eventRef = await this.db.collection('events').doc(doc.id);
                eventRef.set({
                    xpAdded: false
                }, {merge: true});
            })
        })
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
    async rsvp_to_event(id: string, userName: string) {
        let eventRef = this.db.collection("events").doc(id);

        eventRef.update({
            rsvp_list: firestore.FieldValue.arrayUnion(userName)
        });
    }
}

export default EventApi;