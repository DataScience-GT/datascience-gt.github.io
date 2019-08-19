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
    async create_event(name: string, desc: string, XP: number, date: Date, type: string, owner: string, link: string) {
        let newEventRef = this.db.collection("events").doc();
        return newEventRef.set({
            name: name,
            desc: desc,
            XP: XP,
            date: date,
            type: type,
            owner: owner,
            links: [link],
            rsvp_list: []
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

    async delete_events() {
        await this.db.collection('events').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                this.delete_event(doc.id);
            })
        })
    }

    async update_event(id: string, name: string, desc: string, XP: number, date: Date, type: string) {
        let eventRef = this.db.collection("events").doc(id);
        return eventRef.update({
            name: name,
            desc: desc,
            XP: XP,
            date: date,
            type: type,
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