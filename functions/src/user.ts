// import * as admin from 'firebase-admin'; 
// import * as firebaseHelper from 'firebase-functions-helper'; 
import * as bodyParser from "body-parser"
import * as express from "express"; 

// admin.initializeApp(functions.config().firebase); 

// declarations 
// const db = admin.firestore(); 
const userfunc = express(); 
// const contactsCollection = 'contacts'; 
const app = express.Router(); 

userfunc.use('/', app); 

userfunc.use(bodyParser.json()); 
userfunc.use(bodyParser.urlencoded({extended: false})) 


app.get('/create', (req, res) => {
    res.send("Create a new contact"); 
})

module.exports  = userfunc; 



