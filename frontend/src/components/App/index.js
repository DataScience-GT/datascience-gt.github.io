import React from 'react' ;

import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Navigation from '../Navigation'; 
import HomePage from "../Home Page/HomePage"; 
import SignUpPage from "../Signup Page/SignUpPage";
import LoginPage from "../Login Page/LoginPage"; 
import DashboardPage from "../Dashboard/dashboard"; 
import * as ROUTES from "../../constants/routes"

import { withAuthentication} from "../Session"

class App extends React.Component {
    render () {
        return (
            <Router>
                <Navigation/> 
                <Route exact path={ROUTES.LANDING} component={HomePage} />
                <Route path={ROUTES.LOGIN} component={LoginPage} />
                <Route path={ROUTES.SIGNUP} component={SignUpPage} />
                <Route path={ROUTES.DASHBOARD} component={DashboardPage} />
            </Router> 
        )
    }

}
export default withAuthentication(App); 
