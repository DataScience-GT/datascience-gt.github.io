import * as functions from 'firebase-functions';
import * as user from "./user" 


module.exports.user =  functions.https.onRequest(user as any);