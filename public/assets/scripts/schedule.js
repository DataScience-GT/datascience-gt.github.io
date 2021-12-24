const friday = {
    "5:00 PM - 5:45 PM": "Opening Ceremony",
    "6:00 PM - 7:30 PM": "Sponsor Fair",
    "6:00 PM - 7:30 PM": "Team Building",
    "6:30 PM - 7:15 PM": "Clean and Visualize Data Workshop",
    "7:00 PM - 7:30 PM": "GT Athletics Football Challenge Q/A",
    "7:30 PM - 8:15 PM": "Build a Real Time Human Pose Estimator Workshop",
    "8:00 PM - 8:30 PM": "GT Athletics Track Challenge Q/A",
    "9:00 PM - 9:30 PM": "GT Athletics Tennis Challenge Q/A",
    "9:30 PM - 10:30 PM": "Come join us for some pictonary at skribbl.io!"
}

const saturday = {
    "12:30 PM - 1:15 PM": "Using Data to Ensure Mangoes Stay Safe Workshop",
    "1:45 PM - 2:30 PM": "Intro into Machine Learning Workshop",
    "2:45 PM - 3:30 PM": "Interpreting Machine Learning Models Workshop",
    "3:30 PM - 4:00 PM": "Let's do slideshow karraoke with Misha and Maanav!",
    "4:00 PM - 5:00 PM": "How to Present Your Hack Workshop",
    "7:30 PM - 8:30 PM": "MLH U.S. Air Force Cybersecurity Challenge. Tons of Fun!", 
    "9:00 PM - 9:45 PM": "Deploying Models Workshop",
    "10:00 PM - 10:30 PM": "Come Join us for some Among Us!",
}

const sunday = {
    "11:30 AM - 12:00 PM": "A Starup Culture In a Big Organization by Kent Moya from Emerson",
    "12:00 PM - 1:00 PM": "Shaping Your Future with AI with Igor Jablokov, CEO Pryon AI",
    "1:00 PM - 3:00 PM": "Hacker Expo",
    "3:15 PM - 4:00 PM": "Closing Ceremony",
}

function schedule_populate() {
    const friday_schedule = document.getElementById("friday_schedule_table");
    const saturday_schedule = document.getElementById("saturday_schedule_table");
    const sunday_schedule = document.getElementById("sunday_schedule_table");
    // populate friday schedule
    for (item in friday) {
        var row = document.createElement("tr");
        row.classList.add("row");
        var leftCell = document.createElement("td");
        var leftNode = document.createTextNode(item);
        leftCell.appendChild(leftNode);
        leftCell.classList.add("col-12");
        leftCell.classList.add("col-md-4");
        leftCell.classList.add("m-md-2");
        var rightCell = document.createElement("td");
        var rightNode = document.createTextNode(friday[item]);
        rightCell.appendChild(rightNode);
        rightCell.classList.add("col-12");
        rightCell.classList.add("col-md-7");
        rightCell.classList.add("ms-4")
        rightCell.classList.add("m-md-2");
        rightCell.style.whiteSpace = "pre-wrap";
        row.appendChild(leftCell);
        row.appendChild(rightCell);
        friday_schedule.appendChild(row);
    }
    // populate saturday schedule
    for (item in saturday) {
        var row = document.createElement("tr");
        row.classList.add("row");
        var leftCell = document.createElement("td");
        var leftNode = document.createTextNode(item);
        leftCell.appendChild(leftNode);
        leftCell.classList.add("col-12");
        leftCell.classList.add("col-md-4");
        leftCell.classList.add("m-md-2");
        var rightCell = document.createElement("td");
        var rightNode = document.createTextNode(saturday[item]);
        rightCell.appendChild(rightNode);
        rightCell.classList.add("col-12");
        rightCell.classList.add("col-md-7");
        rightCell.classList.add("ms-4")
        rightCell.classList.add("m-md-2");
        rightCell.style.whiteSpace = "pre-wrap";
        row.appendChild(leftCell);
        row.appendChild(rightCell);
        saturday_schedule.appendChild(row);
    }
    // populate sunday schedule
    for (item in sunday) {
        var row = document.createElement("tr");
        row.classList.add("row");
        var leftCell = document.createElement("td");
        var leftNode = document.createTextNode(item);
        leftCell.appendChild(leftNode);
        leftCell.classList.add("col-12");
        leftCell.classList.add("col-md-4");
        leftCell.classList.add("m-md-2");
        var rightCell = document.createElement("td");
        var rightNode = document.createTextNode(sunday[item]);
        rightCell.appendChild(rightNode);
        rightCell.classList.add("col-12");
        rightCell.classList.add("col-md-7");
        rightCell.classList.add("ms-4")
        rightCell.classList.add("m-md-2");
        rightCell.style.whiteSpace = "pre-wrap";
        row.appendChild(leftCell);
        row.appendChild(rightCell);
        sunday_schedule.appendChild(row);
    }
}

function friday_toggle() {
    // Highlight friday button
    document.getElementById("friday_button").style.boxShadow = "0px 0px 10px #ECAE58";
    document.getElementById("saturday_button").style.boxShadow = "0px 0px 0px #ECAE58";
    document.getElementById("sunday_button").style.boxShadow = "0px 0px 0px #ECAE58";

    // load friday schedule
    const friday_schedule = document.getElementById("friday_schedule");
    const saturday_schedule = document.getElementById("saturday_schedule");
    const sunday_schedule = document.getElementById("sunday_schedule");
    friday_schedule.style.display = "block";
    saturday_schedule.style.display = "None"
    sunday_schedule.style.display = "None";
}

function saturday_toggle() {
    // Highlight saturday button
    document.getElementById("friday_button").style.boxShadow = "0px 0px 0px #ECAE58";
    document.getElementById("saturday_button").style.boxShadow = "0px 0px 10px #ECAE58";
    document.getElementById("sunday_button").style.boxShadow = "0px 0px 0px #ECAE58";

    // load saturday schedule
    const friday_schedule = document.getElementById("friday_schedule");
    const saturday_schedule = document.getElementById("saturday_schedule");
    const sunday_schedule = document.getElementById("sunday_schedule");
    friday_schedule.style.display = "None";
    saturday_schedule.style.display = "block"
    sunday_schedule.style.display = "None";
}

function sunday_toggle() {
    // Highlight sunday button
    document.getElementById("friday_button").style.boxShadow = "0px 0px 0px #ECAE58";
    document.getElementById("saturday_button").style.boxShadow = "0px 0px 0px #ECAE58";
    document.getElementById("sunday_button").style.boxShadow = "0px 0px 10px #ECAE58";

    // load sunday schedule
    const friday_schedule = document.getElementById("friday_schedule");
    const saturday_schedule = document.getElementById("saturday_schedule");
    const sunday_schedule = document.getElementById("sunday_schedule");
    friday_schedule.style.display = "None";
    saturday_schedule.style.display = "None"
    sunday_schedule.style.display = "block";
}