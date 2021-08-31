import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import team from './team.png';
import * as ROUTES from "../../../config/routes";

///////////////////////
// STYLES
///////////////////////

let rowStyle = {
  verticalAlign: "center",
  color: "white",
  backgroundColor: "#0063B9",
  overflow: "hidden",
}

let picContainer = {
  maxHeight: "70vh",
}

let teamStyle = {
  width: "100%",

}

let textStyle = {
  padding: "15vh 6vw 0 2vw",
}

///////////////////////
// CLASSES
///////////////////////

export default class MeetTeam extends React.Component {
  render() {
    return (
      <div>
          <Row style={rowStyle}>
            <Col xs={0} md={0} lg={7}>
              <div style={picContainer}>
                <Image src={team} alt="The team" style={teamStyle} fluid/>
              </div>
            </Col>
            <Col>
              <Container style={textStyle}>
                <h2>Meet the Team</h2>
                <p>Data Science @ Georgia Tech started as a small club at the
                Georgia Institute of Technology for spreading awareness and
                education about data science. It has since morphed into a
                massive program that reaches over 200 people every year and
                draws over 100 people to each of its main events. DSGT provides
                students with workshops, project opportunities, and
                leadership opportunities to help train the next generation
                of data scientists. </p>
                <Button variant="outline-light" href={ROUTES.OUR_TEAM}>Learn More</Button>
              </Container>
            </Col>
          </Row>
      </div>
    );
  }
}
