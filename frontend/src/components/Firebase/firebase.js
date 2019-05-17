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

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig); 
        this.app = app; 
        this.db = this.app.firestore(); 
        this.user = new UserApi(this); 
        this.file = new FileApi(this); 
        this.group = new GroupApi(this); 
    }
}


export default Firebase; 