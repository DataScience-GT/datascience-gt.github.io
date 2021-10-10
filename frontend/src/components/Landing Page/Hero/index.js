import React from "react";
import { Container, Button } from "react-bootstrap";
import background from "./background.jpg";
import * as ROUTES from "../../../config/routes";
///////////////////////
// STYLES
///////////////////////
let backgroundImg = {
  backgroundImage: `url(${background})`,
  // height: "100%",
  height: "80vh",
  backgroundSize: "cover",
  color: "white",
};

let backgroundTint = {
  height: "inherit",
  // background: 'rgba(0,99,185,0.75)',
  background:
    "linear-gradient(to bottom, rgba(0,22,41,1), rgba(0,22,41,0.7), rgba(0,99,185,0.7), rgba(0,99,185,0.7))",
};

let textStyle = {
  padding: "8vw",
  paddingTop: "25vh",
  alignItems: "center",
  textAlign: "center",
  opacity: "1",
};

let linkColor = {
  color: "lightblue",
};

let linkStyle = {
  alignItems: "center",
  textAlign: "center",
}

///////////////////////
// CLASSES
///////////////////////

export default class Landing extends React.Component {
  render() {
    return (
      <div style={backgroundImg}>
        <div style={backgroundTint}>
          <Container style={textStyle}>
            <h1>MAKING DATA SCIENCE ACCESSIBLE TO ALL</h1>
            <p style={linkStyle}>
              {" "}
              Join our mission: apply{" "}
              <a
                style={linkColor}
                href="https://docs.google.com/forms/d/e/1FAIpQLSfv3_12vdyWsy_Lz9u3DCarO1Mw_HxIsF3hzm-92KOVU_otwQ/viewform?usp=sf_link"
              >
                here{" "}
              </a>
            </p>
            {/*<Button
              variant="outline-light"
              href={
                "https://www.canva.com/design/DAEoU1eyMFU/bdoAHNAioTW8qtU4X_P9Vw/view?utm_content=DAEoU1eyMFU&utm_campaign=designshare&utm_medium=link&utm_source=sharebutton"
              }
            >
              Attend Kickoff!
            </Button>*/}
            <Button
              variant="outline-light"
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSfv3_12vdyWsy_Lz9u3DCarO1Mw_HxIsF3hzm-92KOVU_otwQ/viewform"
              }
            >
              Apply for Leadership positions
            </Button>
          </Container>
        </div>
      </div>
    );
  }
}
