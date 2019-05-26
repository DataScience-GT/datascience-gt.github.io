/**
 * Verifies a user. Performs several actions: 
 * - Adds to accounting spreadsheet 
 * - Adds to spreadsheet of verified users (for slack/record keeping purposes)
 * 
 * @param data Data should include a JSON object describing relevant details about the user. 
 * Contract: 
 * ```ts
 * {
 *  "uid": string, //UID of user 
 *  "amount": number // Amount paid 
 *  "is_cash": boolean  //Whether or not this was a cash payment vs venmo. True=Cash
 * }
 * ```
 * @param context The authentication context for this call
 */

require('cors')({ origin: true });

export const onUserVerify =  function(data: any, context: any): any {
    return {
        "status": 200, 
        "data": data, 
        "auth": context.auth.uid
    }
} 