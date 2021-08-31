import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import gears from "./gears.png";
import hand from "./hand.png";
import project from "./project.png";
import search from "./search.png";
import theory from "./theory.png";
import * as ROUTES from "../../../config/routes";

let picContainer = {
  height: "30vh",
  padding: "1em",
};

let chunk = {
  padding: "2em 1em 2em 1em",
};

let divPadding = {
  padding: "4em 0 4em 0",
};

let blue = {
  color: "#0063B9",
};

export default class WhatWeDo extends React.Component {
  render() {
    return (
      <div>
        <div style={divPadding}>
          <Container>
            {/* Row: image on left */}
            <Row style={chunk}>
              <Col align="center">
                <div>
                  <img src={gears} alt="gears icon" style={picContainer} />
                </div>
              </Col>
              <Col>
                <h2 style={blue}>Providing Foundation</h2>
                <p>
                  We teach our members core data science skills through a
                  bootcamp that takes our members on a start-to-finish journey,
                  touching on essentials such as cleaning data and identifying
                  biases to more advanced concepts, such as dimensionality
                  reduction and machine learning – all in a digestible,
                  applicable, and interactive format. Members come out of our
                  bootcamp with a polished data science project and the
                  confidence to learn more.
                </p>
              </Col>
            </Row>
            {/* Row: image on right */}
            {/*<Row style={chunk}>
              <Col>
                <h2 style={blue}>Providing Practical Education</h2>
                <p>
                  After our foundational content, we give our members the
                  opportunity to expand their practical and theoretical skills
                  through bootcamps tailored to specific concentrations of
                  learning. Data Science is more than just programming; we're
                  equipping our members to apply their skills in the fields of
                  Healthcare, Finance, Data Engineering, Data Visualization, &
                  more!
                </p>
              </Col>
              <Col align="center">
                <div>
                  <img src={hand} alt="hand icon" style={picContainer} />
                </div>
              </Col>
            </Row>
            {/* Row: iamge on left */}
            {/*<Row style={chunk}>
              <Col align="center">
                <div>
                  <img src={theory} alt="theory icon" style={picContainer} />
                </div>
              </Col>
              <Col>
                <h2 style={blue}>Promoting Inquisitiveness</h2>
                <p>
                  Our members are bright and talented students. Our goal is to
                  help them continue to learn and grow through thoughtful and
                  engaging conversations surrounding data science.
                </p>
              </Col>
            </Row>
            {/* Row: iamge on right */}
            <Row style={chunk}>
              <Col>
                <h2 style={blue}>Providing Opportunity</h2>
                <p>
                  We assist chapters and individuals in starting and running
                  local data science projects to offer students an opportunity
                  to work in a team and exercise their skills. We also organize
                  a yearly hackathon, Hacklytics, for those of all skill levels
                  to hone in our their data science skills.{" "}
                  <a style={blue} href={ROUTES.PROJECTS}>View our ongoing projects</a>
                </p>
              </Col>
              <Col align="center">
                <div>
                  <img src={project} alt="project icon" style={picContainer} />
                </div>
              </Col>
            </Row>
            {/* Row: iamge on left */}
            <Row style={chunk}>
              <Col align="center">
                <div>
                  <img src={search} alt="search icon" style={picContainer} />
                </div>
              </Col>
              <Col>
                <h2 style={blue}>Providing a Future</h2>
                <p>
                  DSGT arranges projects with corporate sponsors to allow
                  members to work on real life data science problems full-time
                  or part-time all while getting paid. We also organize company
                  events and talks that allow our members to build a network and
                  learn more about the professional opportunities in the field
                  of data science.{" "}
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
