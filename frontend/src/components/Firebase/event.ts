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

    async get_event(uid: string) {

    }

    async create_event(name: string, desc: string, date: Date) {
        let newEventRef = this.db.collection("events").doc();
    }
}