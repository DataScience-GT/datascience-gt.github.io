/** 
 * Links all the different API endpoints together. 
 * Wraps up all the different cloud functions 
 */
import * as functions from 'firebase-functions';
import * as funcs from "./funcs" 
// import * as events from './events';

require('cors')({ origin: true });


module.exports.onUserVerify = functions.https.onCall(funcs.onUserVerify); 
module.exports.onUserVerifyDummy = functions.https.onCall(funcs.onUserVerifyDummy); 
module.exports.scheduledEventXPDistribution = functions.pubsub.schedule(('every day 00:00')).onRun(async context => {
    funcs.scheduledEventXPDistribution
});
// module.exports.userCreateAddInfo = functions.https.onCall(funcs.userCreateAddInfo);  
// module.exports.userDeleteTrigger = functions.auth.user().onDelete(funcs.onUserDelete); 