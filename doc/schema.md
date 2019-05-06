# Schema Explanation 

## Entities 

### User Entity 

```json 
{
    "uid": 12345, 
    "first_name": "George", 
    "last_name": "Burdell", 
    "gt_email": "gburdell3@gatech.edu", 
    "alt_email": "george.p.burdell@gmail.com", 
    "phone_number": "404-404-4040", 
    "slack_id": "UUX12345", 
    "XP": 50, 
    "resume_uri": "::users/12345/resumes/fname.pdf", 
    "event_history": {
        "workshops": [
            "event_id_1", 
            "event_id_2", 
            "event_id_3"
        ], 
        "project_meetings": [
            "event_id_4", 
            "event_id_5", 
            "event_id_6"
        ], 
        "other_events": [
            "event_id_7", 
            "event_id_8", 
            "event_id_9"
        ]
    }, 
    "groups": [
        "exec", 
        "membership", 
        "membership_head", 
        "atl_crime_map"
    ], 
    "qr_code": "::users/12345/qr.png", 
    "creation_ts": 11122355, 
    "verified_ts": 11122366,
    "membership_status": "pending", 
    "short_title": "Head of External Affairs"
}
``` 

#### Explanation 

`uid` Auto-generated UID. Acts as a global PK. 

`first_name` User's preferred first name 

`last_name` User's preferred last name 

`gt_email` User's Georgia Tech email. Acts as a PK, and prevents duplicate account creation. 

`alt_email` User's preferred alternate email, if any. 

`phone_number` User's preferred contact phone number. 

`slack_id` User's ID on slack, for integration purposes 

`XP` An integer value of the user's experience points, calculated by whatever formula we use. 

`resume_uri` A URI for the Resume. Allows one preferred resume. More explanation for URI scheme below. 

`event_history` Array of event histories, split up by name.  This includes: 
    `workshops` The user's history of attended workshops 
    `project_meetings` The user's history of project meetings 
    `other_events` All other events (including special events) 

`groups` The list of user's group memberships. Groups act as our primary permission control mechanism. Default groups include: 
    - `exec` members of the executive board 
    - `head-*` individual, one-person groups for each position on exec. for example, `head-marketing` or `head-membership` 
    - `*` groups for each branch of the team. For example, `marketing` or `membership` 
    - Each project also gets a group 

`qr_code` Reference to the member's QR code. More details in URI section; encodes user's ID 

`creation_ts` Account creation date (when they submit the membership form) 

`verified_ts` date of latest verification 

`membership_status` Status of membership, due to the different stages a single user might be at. These stages include: 
    - `pending` Has submitted form, but we have yet to verify dues payment 
    - `active_semester` Form submitted, and all dues are for a semester 
    - `active_year` Form submitted, all dues are paid for a year  
    - `suspended` Taking a break for the semester/left the club 
    - `unpaid` Returning members who have yet to pay dues 

`short_title` A short description of what they do in the club (for leadership) 

### Event Entity 

```json 
{
    "eid": "event_id", 
    "type": "workshop", 
    "attendance": [
        {"uid": 12345, "ts": 1122334455}, 
        {"uid": 12346, "ts": 1122334456}, 
    ], 
    "short_desc": "This is a workshop", 
    "long_desc": "This workshop goes into ......", 
    "misc_files": [
        "::events/event_id/a.pdf", 
        "::events/event_id/nb.ipynb"
    ], 
    "workshop": {
        "ppt_uri": "::event_files/event_id/presentation.ppt", 
        "ipynb": "drive.google.com/share/......ipynb"
    },
    "special_event": {
        "sponsors": [
            {
                "sponsor": "P&G", 
                "sponsor_logo": "::events/event_id/pg.png", 
                "blurb": "P&G will be helping with ..."    
            }
        ],
        "event_logo": "::events/event_id/logo.png"
    }, 
    "gm": {
        "slides": "::events/event_id/slides.ppt"
    }
}
```

#### Explanation 

`eid` Event ID 

`type` Type of event. Can be either: 
    - `workshop` A workshop. 
    - `project` A projet 
    - `gm` A general meeting. 
    - `special` Any other event. 

`attendance` List of people who checked in, along with timestamp of check in 

`short_desc` A short one-liner for the event 

`long_desc` A longer blurb for the event 

`misc_files` Files that will show up as "other resources" 

`workshop` Will be null or missing if not a workshop. Contains links to special workshop resources. 

`special_event` Will be null or missing if not a special event. Contains links to other special event resources, including: 
    - sponsors: List of our sponsors for this event, along with their logo and a short blurb. 
    - event logo: the logo for this event. 

`gm` will be null or missing if not a general meeting. Contains the slides to the general meeting. 

### Groups 

```json
{
    "name": "exec", 
    "members": [
        {"uid": 12345, "joined_ts": 11223344}
    ]
}
```

This is self explanatory, used to get a quick overview of who is in what group instead of having to iterate through all members. 

## URI scheme 

URIs can be one of tho things: a URL or a app-specific URI. If it is a app-specific URI, we will prepend `::` to the identifier. Otherwise, a URL is assumed. 
There is a simple scheme to the app-specific URIs: 

    ```(user|event)/(id)/(subfolder, if any)/filename``` 

The only current subfolder is "resumes" for user resumes. 
We can host everything in some cloud bucket. 
