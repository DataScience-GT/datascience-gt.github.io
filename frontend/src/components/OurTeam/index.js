import React from "react";
import Footer from "../Footer";
import TeamMembers from "./sections/TeamMembers";
import { Button, Container } from "react-bootstrap";
import * as ROUTES from '../../config/routes';

/*
export default class About extends React.Component {
  render() {
    return(
      <div>

        <TeamMembers />
        <Footer />
      </div>
    );
  }
}
*/

let textStyle = {
  padding: "15vh 6vw 0 2vw",
};

export default class About extends React.Component {
  render() {
    return (
      <Container style={textStyle}>
        <h2>Coming Soon</h2>
      </Container>
    );
  }
}
