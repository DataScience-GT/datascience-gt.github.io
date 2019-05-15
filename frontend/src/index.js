import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import LoginPage from './components/loginpage/LoginPage';
import SignUpPage from "./components/signuppage/SignUpPage"; 
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from "./components/Firebase"; 

const Routes = (
    <FirebaseContext.Provider value={new Firebase()}>
        <Router>
        <div>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route path='/login' component={LoginPage}/>
                <Route path='/signup' component={SignUpPage} />
            </Switch>
        </div>
    </Router>
    </FirebaseContext.Provider>
);

ReactDOM.render( 
    Routes, document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
