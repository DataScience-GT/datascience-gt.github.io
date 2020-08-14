import React from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row } from 'react-bootstrap';
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import "./Footer.css";
import icon from './icon.png';

let divPadding = {
  paddingTop: "4em",
}


export default function Footer() {
  return (
    <div>
    <Navbar className="justify-content-center main" style={divPadding} sticky="bottom">
      <Row>
      <Col>
      <Navbar.Brand href="#home">
      <img
        src={icon}
        width="90"
        height="90"
        alt="DSGT icon"
      />
      </Navbar.Brand>
      </Col>
      {/*column 1*/}
      <Col>
        <ul className="list-unstyled">
          <Nav.Link href="/home">About Us</Nav.Link>
          <Nav.Link eventKey="/contact">Contact</Nav.Link>
          <Nav.Link eventKey="/terms-conditions">Terms & Conditions</Nav.Link>
        </ul>
      </Col>
      {/*column 2*/}
      <Col>
        <ul className="list-unstyled">
          <Nav.Link href="/facebook"><FaFacebookF />Facebook</Nav.Link>
          <Nav.Link href="/instagram"><FaInstagram />Instagram</Nav.Link>
        </ul>
      </Col>
      {/*column 3*/}
      <Col>
        <ul className="list-unstyled">
          <Nav.Link href="/start-a-chapter">Start a Chapter</Nav.Link>
          <Nav.Link href="/donate">Donate</Nav.Link>
          <Nav.Link href="/sponsor-us">Sponsor Us</Nav.Link>
        </ul>
      </Col>
      {/*column 4*/}
      <Col>
        <ul className="list-unstyled">
        <Nav.Link eventKey="disabled" disabled>
          220 Ferst Dr NW, Atlanta, GA 30318
          +1 941 286 3117
          legal@datascienceinitiative.org
        </Nav.Link>
        </ul>
      </Col>
      </Row>
    </Navbar>
    <Navbar className="justify-content-center main" >
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
