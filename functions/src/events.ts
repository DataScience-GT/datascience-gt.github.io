import * as functions from "firebase-functions"
import * as admin from "firebase-admin"

admin.initializeApp(functions.config().firebase); 
const db = admin.firestore(); 

export const scheduledEventXPDistribution = functions.pubsub.schedule(('every day 00:00')).onRun(async context => {
    let events: any = get_events();

    events.forEach(event => {
        if(new Date(event.data.date) < new Date()) {
            let users = event.data.rsvp_list;
            users.forEach(user => {
                
            }) 

        }
    })
});

/**
 * 
 */
export async function get_events() {
    let events: any = [];
    await db.collection('events').get().then(snapshot => {
        snapshot.docs.forEach(doc => {
            if(!doc.data().xpAdded) {
                events.push({id: doc.id, data: doc.data()});
            }
        })
    })

    return events;
}