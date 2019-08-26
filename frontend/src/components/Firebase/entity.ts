/**
 * Contains all models: entities as interfaces, and enums where necessary. 
 * 
 * Wherever a URI is needed, it follows the following scheme: 
 *  
 * URIs can be one of tho things: a URL or a app-specific URI. If it is a app-specific URI, we will prepend `::` to the identifier. Otherwise, a URL is assumed. 
 * There is a simple scheme to the app-specific URIs: 
 *  ```(user|event)/(id)/(subfolder, if any)/filename``` 
 * The only current subfolder is "resumes" for user resumes. 
 * We can host everything in some cloud bucket. 
 */

/**
 * Contains the membership statuses. Current options: 
 *   - `pending` Has submitted form, but we have yet to verify dues payment 
 *   - `active_semester` Form submitted, and all dues are for a semester 
 *   - `active_year` Form submitted, all dues are paid for a year  
 *   - `suspended` Taking a break for the semester/left the club 
 *   - `unpaid` Returning members who have yet to pay dues 
 */
export enum MembershipStatus {
    pending, 
    active_semester, 
    active_year, 
    suspended, 
}

/**
 * General Group reference. For linking between entities. 
 *  - `name`: name of group 
 */
export interface Group {
    name: string, 
}

/**
 * Primary User Interface. Contains: 
 * 
 * `uid` Auto-generated UID. Acts as a global PK. 
 * 
 * `first_name` User's preferred first name 
 * 
 * `last_name` User's preferred last name 
 * 
 * `gt_email` User's Georgia Tech email. Acts as a PK, and prevents duplicate account creation. 
 *
 * `alt_email` User's preferred alternate email, if any. 
 * 
 * `major` User's major at Gatech
 * 
 * `year` User's current year at Gatech
 * 
 * `industry pref 1` primary industry preference
 *
 * `industry pref 2` secondary industry preference
 * 
 * `industry pref 3` tertia industry preference
 *  
 * `phone_number` User's preferred contact phone number. 
 * 
 * `slack_id` User's ID on slack, for integration purposes 
 * 
 * `XP` An integer value of the user's experience points, calculated by whatever formula we use. 
 * 
 * `resume_uri` A URI for the Resume. Allows one preferred resume. More explanation for URI scheme below. 
 * 
 * `event_history` Array of event histories, split up by name.  This includes: 
 *  - `workshops` The user's history of attended workshops 
 *  - `project_meetings` The user's history of project meetings 
 *  - `other_events` All other events (including special events) 
 * 
 * `groups` The list of user's group memberships. Groups act as our primary permission control mechanism. See [[UserGroup]]. 
 * 
 * `qr_code` Reference to the member's QR code. More details in URI section; encodes user's ID 
 * 
 * `creation_ts` Account creation date (when they submit the membership form) 
 * 
 * `verified_ts` date of latest verification 
 * 
 * `membership_status` Status of membership, due to the different stages a single user might be at. See [[MembershipStatus]]
 * 
 * `short_title` A short description of what they do in the club (for leadership)
 */
export interface User {
    uid: number|string, 
    first_name: string, 
    last_name: string, 
    gt_email: string, 
    alt_email: string, 
    major: string,
    year: string
    phone_number: string, 
    slack_id: string, 
    XP: number, 
    resume_uri: string, 
    event_history: {
        workshop: Array<number>, 
        project: Array<number>, 
        gm: Array<number>
        other: Array<number>
    },
    xp_history: Array<Object>,
    interests: Array<string>, 
    profile_pic: string,
    groups: Array<Group>, 
    qr_code: string, 
    creation_ts: number, 
    verified_ts: number, 
    membership_status: MembershipStatus, 
    short_title: string, 
    verification_uri: string //Will be "cash" if cash 
}

/**
 * Each type of event we may have. 
 */
export enum EventType {
    workshop, 
    project, 
    gm,
    other
}

/**
 * Generic type to support counting attendance. 
 */
export interface Attendance {
    uid: number, 
    ts: number
}

/**
 * Special things required for a workshop event. 
 */
export interface WorkshopEvent {
    ppt_uri: string, 
    ipynb: string
}

/**
 * Special things that represent a sponsor. 
 */
export interface Sponsor {
    name: string, 
    logo: string, 
    blurb: string
}

/**
 * Special things that are required for a sponsored event. 
 */
export interface OtherEvent {
    sponsors: Array<Sponsor>, 
    logo: string
}

/**
 * Special things required for a group meeting. 
 */
export interface GMEvent {
    slides: string
}

/** 
 * Our generic Event interface. Includes: 
 * 
 * `eid`: the event's ID. 
 * `name`: Name for the event. 
 * `date`: Date in standard UTC format. 
 * `creation_ts`: when the event was actually created 
 * `event_type`: See [[EventType]]
 * `attendance`: List of attendees. See [[Attendance]]. 
 * `short_desc`: one-liner preview for the event. 
 * `long_desc`: longer blurb for the event 
 * `misc_files`: any special resources that can't be categorized. Optional.
 * `workshop`: Info for a workshop event. See [[WorkshopEvent]]. Optional.
 * `other`: Info for a special event. See [[OtherEvent]]. Optional
 * `gm`: Info for a general meeting. See [[GMEvent]]. Optional
 */
export interface Event {
    eid: number, 
    name: string,
    date: string,
    creation_ts: number  
    event_type: EventType, 
    attendance: Array<Attendance>, 
    short_desc: string, 
    long_desc: string, 
    misc_files?: Array<String>, 
    workshop?: WorkshopEvent, 
    other?: OtherEvent, 
    gm?: GMEvent
}

/**
 * Provides a cross-index for our groups. 
 * `name`: Identical to the name in [[Group.name]]
 * `group`: the "PK" for this group. See [[Group]] 
 * `members`: A list of members and when they joined. See [[Attendance]]
 */
export interface UserGroup {
    name: string,
    group: Group, 
    members: Array<Attendance>
}
