import React from "react";
import { withRouter } from "react-router-dom";
// import DashboardNavbar from "./Member Dashboard/Dashboard Navbar";
// import DashboardHomePage from "./Common/Home Page";

import { Button, Form, Container, Row, Col, Table } from "react-bootstrap";
import "./SponsorsPage.css";

/**
 * @author Sarah Yoo
 */
export default class SponsorsPage extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <div class="sponsor-container">
            <div className="title">
              <h3>OUR SPONSORS</h3>
            </div>
            <Container>
              <Row>
                <Col>
                  <div className="logo">
                    <img src="img/correlationOne.jpg" />
                  </div>
                  <div className="link">
                    <a
                      className="btn sponsor-btn"
                      href="https://www.correlation-one.com/l"
                    >
                      <h5>Correlation One</h5>
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="logo">
                    <img src="img/att.png" />
                  </div>
                  <div className="link">
                    <a className="btn sponsor-btn" href="https://www.att.com/">
                      <h5>AT&T</h5>
                    </a>
                  </div>
                </Col>
                <Col>
                  <div className="logo">
                    <img src="img/citadel.jpg" />
                  </div>
                  <div className="link">
                    <a
                      className="btn sponsor-btn"
                      href="https://www.citadel.com/"
                    >
                      <h5>Citadel</h5>
                    </a>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div class="packages">
            <div className="title">
              <h3>2019-2020 SPONSORSHIP TIERS</h3>
            </div>
            <div className="container-table">
              <Table>
                <thead>
                  <th width="500"> </th>
                  <th>
                    <h6>Bronze</h6>
                  </th>
                  <th>
                    <h6>Silver</h6>
                  </th>
                  <th>
                    <h6>Gold</h6>
                  </th>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="perks">
                        <h6>
                          Access to Resume Booklet containing all our members
                        </h6>
                      </div>
                    </td>
                    <td>
                      <h6>Unsorted</h6>
                    </td>
                    <td>
                      <h6>Unsorted</h6>
                    </td>
                    <td>
                      <h6>Sorted</h6>
                      <h8>(based on member involvement and skills)</h8>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="perks">
                        <h6>
                          Hosting information sessions, workshops, or recruiting
                          events
                        </h6>
                      </div>
                    </td>
                    <td>
                      <h6>1 event per calendar year</h6>
                    </td>
                    <td>
                      <h6>4 events per calendar year</h6>
                    </td>
                    <td>
                      <h6>Unlimited</h6>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="perks">
                        <h6>Marketing materials on DSGT events</h6>
                      </div>
                    </td>
                    <td>
                      <h6>1 private event per calendar year</h6>
                    </td>
                    <td>
                      <h6>3 public events per calendar year</h6>
                    </td>
                    <td>
                      <h6>All events</h6>
                    </td>
                  </tr>
                  <tr>
                    <td className="bottom">
                      <div className="perks">
                        <h6>
                          Invitation to have a recruitment session or
                          information session at one of our large semesterly
                          events
                        </h6>
                      </div>
                    </td>
                    <td className="bottom"></td>
                    <td className="bottom"></td>
                    <td className="bottom">
                      <div class="container-dot">
                        <span class="dot"></span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="bottom left">
                      <div className="left perks">
                        <h6>Specialized</h6>
                        <ul>
                          <li>
                            <h6>Primary Event Sponsor</h6>
                          </li>
                          <li>
                            <h6>Secondary Event Sponsor</h6>
                          </li>
                          <li>
                            <h6>Conference Sponsor</h6>
                          </li>
                          <li>
                            <h6>Single Information Session</h6>
                          </li>
                          <li>
                            <h6>Private Sponsor/Donor</h6>
                          </li>
                        </ul>
                      </div>
                    </td>
                    <td className="bottom" colspan="3">
                      <h6>
                        Avilable for all Tiers. <br />
                        Included upon request.
                      </h6>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="note container-table">
              <h8>
                *All checks should be made out to the Georgia Tech Foundation.
                All fees are 501(c)(3) tax-deductible.
              </h8>
              <br />
              <h8>
                If you are interested in sponsoring, please contact us for more
                information and pricing.
              </h8>
            </div>
            <div class="contact container-table">
              <a
                className="btn btn-primary btn-contact"
                href="mailto:datasciencegt@gmail.com?subject=DataScience@GT Sponsorship Inquiry"
              >
                <h6>Contact Us</h6>
              </a>
            </div>
          </div>
        </div>
      </Container >
    );
  }
}
