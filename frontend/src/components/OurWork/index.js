import React from "react";
import { Button, Container } from "react-bootstrap";
import Events from "./sections/Events";
import Footer from "../Footer";
import * as ROUTES from "../../config/routes";

import Timeline from "./sections/Timeline";

let divPadding = {
  padding: "4em 0 8em 0",
};

let rightAlign = {
  float: "right",
};

export default class OurWork extends React.Component {
  render() {
    return (
      <div>
        <div style={divPadding}>
          <Timeline />
          <Events />
          <Container>
            <Button href={ROUTES.PROJECTS} style={rightAlign}>
              Check Out Projects
            </Button>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}
