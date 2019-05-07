/** 
 * Links all the different API endpoints together. 
 * Wraps up all the different cloud functions 
 */

import * as functions from 'firebase-functions';
import * as user from "./user" 

module.exports.user =  functions.https.onRequest(user.routedUser); 
module.exports.userCreateAddInfo = functions.https.onCall(user.userCreateAddInfo);  
module.exports.userDeleteTrigger = functions.auth.user().onDelete(user.onUserDelete); 