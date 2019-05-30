/**
 * It's OK that our app secret is in here because the app secret 
 * is public anyway. Security comes from database writing rules 
 * This includes a building class that provides all Firebase 
 * functionality under one reference class. 
 */
import app from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/auth'
import UserApi from "./user";  
import FileApi from "./file"; 
import GroupApi from "./groups"; 

const firebaseConfig = {
    apiKey: "AIzaSyD_OKCjgVUePBaR6KmvjCirYEOSyB_8qTg",
    authDomain: "dsgt-website.firebaseapp.com",
    databaseURL: "https://dsgt-website.firebaseio.com",
    projectId: "dsgt-website",
    storageBucket: "dsgt-website.appspot.com",
    messagingSenderId: "672446353769",
    appId: "1:672446353769:web:f98c65e7ff823af3"
};

/**
 * I'm quite proud of this build pattern. We 
 * link up the classes from the inividual APIs 
 * to the Firebase class itself, so we really have 
 * a series of singletons working together under 
 * one singleton, all accessing the same data, while 
 * keeping file sizes manageable. 
 * - Raj
 */
class Firebase {
    constructor() {
        this.isLocalHost = Boolean(
            window.location.hostname === 'localhost' ||
              // [::1] is the IPv6 localhost address.
              window.location.hostname === '[::1]' ||
              // 127.0.0.1/8 is considered localhost for IPv4.
              window.location.hostname.match(
                /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
              )
          );
        app.initializeApp(firebaseConfig); 
        this.app = app; 
        this.db = this.app.firestore(); 
        this.user = new UserApi(this); 
        this.file = new FileApi(this); 
        this.group = new GroupApi(this); 
    }
}


export default Firebase; 