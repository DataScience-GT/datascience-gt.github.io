import React from 'react' ;
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import Navigation from '../Navigation'; 
import HomePage from "../Home Page"; 
import SignUpPage from "../Signup Page";
import LoginPage from "../Login Page"; 
import Dashboard from '../Dashboard';
import DashboardEventPage from '../Dashboard/Common/Event Page';
import DashboardEditProfilePage from '../Dashboard/Common/Edit Profile Page';
import * as ROUTES from "../../config/routes"
import { withAuthentication } from "../Session"
import  DashboardGroupPage from '../Dashboard/Common/Group Page';

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
                <Route path={ROUTES.DASHBOARD_HOME} component={Dashboard} />
                <Route path={ROUTES.DASHBORD_EDIT_PROFILE} component={DashboardEditProfilePage}/>
                <Route path={ROUTES.DASHBOARD_EVENT} component={DashboardEventPage}/>                
                <Route path={ROUTES.DASHBOARD_GROUP} component={DashboardGroupPage} />
            </Router> 
        )
    }

}

export default withAuthentication(App); 
