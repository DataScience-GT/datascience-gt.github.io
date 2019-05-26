/** 
 * Links all the different API endpoints together. 
 * Wraps up all the different cloud functions 
 */
import * as functions from 'firebase-functions';
import * as funcs from "./funcs" 

require('cors')({ origin: true });


module.exports.onUserVerify = functions.https.onCall(funcs.onUserVerify); 
// module.exports.userCreateAddInfo = functions.https.onCall(funcs.userCreateAddInfo);  
// module.exports.userDeleteTrigger = functions.auth.user().onDelete(funcs.onUserDelete); 