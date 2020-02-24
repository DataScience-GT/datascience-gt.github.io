import React from "react";
import { withRouter } from "react-router-dom";
// import DashboardNavbar from "./Member Dashboard/Dashboard Navbar";
// import DashboardHomePage from "./Common/Home Page";
import { FirebaseContext } from "../Firebase";

import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import * as ROUTES from "../../config/routes";
import * as CONSTANTS from "../../config/config";

/**
 * @author Sarah Yoo
 */
export default class SponsorsPage extends React.Component {
  render() {
    return (
      <div>
        <div class="sponsor-container">
          <div class="gold"></div>
          <div class="silver"></div>
          <div class="bronze"></div>
          <div class="specialized"></div>
        </div>
        <div class='packages'>e 
          <h4>Tiers and Perks</h4>
          <h3>Gold</h3>
          <ul>
              <li>All of Silver tier perks, plus</li>
              <li>Priority marketing material on ALL of our public events</li>
              <li>As many recruitment events or information sessions as you would like</li>
              <li>Invitation to have a recruitment session or information session at one of our large semesterly events</li>
          </ul>
          <h3>Silver</h3>
          <ul>
              <li>All of Bronze tier perks, plus</li>
              <li>Sorted resume booklet based on member involvement and experience</li>
              <li>Ability to hold four information sessions, technical workshops, or recruitment events per calendar year</li>
              <li>Marketing materials on three of our public events</li>
          </ul>
          <h3>Bronze</h3>
          <ul>
              <li>Access to our unsorted Resume Booklet, containing all of our members</li>
              <li>Ability to host one information session per calendar year</li>
              <li>Marketing materials on one of our events, per school year</li>
          </ul>
          <h3>Specialized</h3>
          <ul>
              <li>Primary Event Sponso</li>
              <li>Secondary Event Sponsor</li>
              <li>Conference Sponsor</li>
              <li>Single Information Session</li>
              <li>Private Sponsor/Donor</li>
          </ul>
        </div>
        <div class='contact'>
            <h3>Interested in becoming a sponsor or have any other questions? Contact us at [email]</h3>
        </div>
      </div>
    );
  }
}
