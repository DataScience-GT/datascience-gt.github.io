import React from 'react' ;

import {BrowserRouter as Router, Route} from 'react-router-dom'; 

import Navigation from '../Navigation/Navigation'; 
import HomePage from "../Home Page/HomePage"; 
import SignUpPage from "../Signup Page/SignUpPage";
import LoginPage from "../Login Page/LoginPage"; 
import DashboardPage from "../Dashboard/Dashboard"; 
import DashboardEventPage from '../Dashboard/Common/Event Page/DashboardEventPage';
import DashboardEditProfilePage from '../Dashboard/Common/Edit Profile Page/DashboardEditProfilePage';
import * as ROUTES from "../../config/routes"

import { withAuthentication} from "../Session"
import  DashboardGroupPage from '../Dashboard/Common/Group Page/DashboardGroupPage';

/**
 * @author Raj Shrimali and Vidhur Kumar
 */
class App extends React.Component {
    render () {
        return (
            <Router>
                <Navigation/> 
                <Route exact path={ROUTES.LANDING} component={HomePage} />
                <Route path={ROUTES.LOGIN} component={LoginPage} />
                <Route path={ROUTES.SIGNUP} component={SignUpPage} />
                <Route path={ROUTES.DASHBOARD_HOME} component={DashboardPage} />
                <Route path={ROUTES.DASHBORD_EDIT_PROFILE} component={DashboardEditProfilePage}/>
                <Route path={ROUTES.DASHBOARD_EVENT} component={DashboardEventPage}/>                
                <Route path={ROUTES.DASHBOARD_GROUP} component={DashboardGroupPage} />
            </Router> 
        )
    }

}
export default withAuthentication(App); 
