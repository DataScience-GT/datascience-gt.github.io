import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "../Navigation";
import LandingPage from "../Landing Page";
import SponsorsPage from "../Sponsors Page";
import SignUpPage from "../Signup Page";
import LoginPage from "../Login Page";
import Dashboard from "../Dashboard";
import DashboardEventPage from "../Dashboard/Common/Event Page";
import DashboardEditProfilePage from "../Dashboard/Common/Edit Profile Page";
import * as ROUTES from "../../config/routes";
import { withAuthentication } from "../Session";
import DashboardGroupPage from "../Dashboard/Common/Group Page";
import OurTeam from "../OurTeam";
import OurWork from "../OurWork";
import Contact from "../Contact";
import Bootcamp from "../Bootcamp";
import Projects from "../Projects";

/**
 * @author Raj Shrimali and Vidhur Kumar
 */
class App extends React.Component {
  render() {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Router>
          <Navigation />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SPONSORS} component={SponsorsPage} />
          <Route path={ROUTES.LOGIN} component={LoginPage} />
          <Route path={ROUTES.SIGNUP} component={SignUpPage} />
          <Route path={ROUTES.DASHBOARD_HOME} component={Dashboard} />
          <Route
            path={ROUTES.DASHBORD_EDIT_PROFILE}
            component={DashboardEditProfilePage}
          />
          <Route path={ROUTES.DASHBOARD_EVENT} component={DashboardEventPage} />
          <Route path={ROUTES.DASHBOARD_GROUP} component={DashboardGroupPage} />

          <Route path={ROUTES.PROJECTS} component={Projects} />
          <Route path={ROUTES.BOOTCAMP} component={Bootcamp} />
          <Route path={ROUTES.OUR_TEAM} component={OurTeam} />
          <Route path={ROUTES.OUR_WORK} component={OurWork} />
          <Route
            path="<a href='mailto:hello@datasciencegt.org'>

</a>"
          />
        </Router>
      </>
    );
  }
}

export default withAuthentication(App);
