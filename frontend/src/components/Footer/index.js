import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Col, Row } from "react-bootstrap";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Navigation.css";
import icon from "./icon.png";

import * as ROUTES from "../../config/routes";

var divPadding = {
  paddingTop: "4em",
};

export default class Footer extends React.Component {
  render() {
    return (
      <div>
        <Navbar
          className="justify-content-center main"
          style={divPadding}
          sticky="bottom"
        >
          <Row>
            <Col>
              <Navbar.Brand href="https://datasciencegt.org/">
                <img src={icon} height="300" alt="DSGT icon" />
              </Navbar.Brand>
            </Col>
            {/*column 1*/}
            <Col>
              <ul className="list-unstyled">
                <Nav.Link href={ROUTES.OUR_WORK}>About Us</Nav.Link>
                <Nav.Link href="mailto:hello@datasciencegt.org">
                  Contact
                </Nav.Link>
                <Nav.Link href="/">Terms & Conditions</Nav.Link>
              </ul>
            </Col>
            {/*column 2*/}
            <Col>
              <ul className="list-unstyled">
                <Nav.Link
                  href="https://www.facebook.com/datasciencegt/"
                  target="_blank"
                >
                  <FaFacebookF />
                  Facebook
                </Nav.Link>
                <Nav.Link
                  href="https://www.instagram.com/datasciencegt/"
                  target="_blank"
                >
                  <FaInstagram />
                  Instagram
                </Nav.Link>
              </ul>
            </Col>
            {/*column 3*/}
            <Col>
              <ul className="list-unstyled">
                {/*<Nav.Link href="/start-a-chapter">Start a Chapter</Nav.Link> */}
                {/*<Nav.Link href="/donate">Donate</Nav.Link>*/}
                <Nav.Link href={ROUTES.SPONSORS}>Sponsor Us</Nav.Link>
              </ul>
            </Col>
            {/*column 4*/}
            <Col>
              <ul className="list-unstyled">
                <Nav.Link eventKey="disabled" disabled>
                  220 Ferst Dr NW, Atlanta, GA 30318
                  hello@datasciencegt.org
                </Nav.Link>
              </ul>
            </Col>
          </Row>
        </Navbar>
        <Navbar className="justify-content-center main">
          <Row>
            <Nav.Link eventKey="disabled" disabled>
              <p className="text-xs-center">
                &copy;{new Date().getFullYear()} Data Science Initiative, Inc.
              </p>
            </Nav.Link>
          </Row>
        </Navbar>
      </div>
    );
  }
}
