import React from "react";
import { Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";

/// make a global stylesheet for this div and divpadding
let divPadding = {
  padding: "4em 0 4em 0",
};

let divPaddingInner = {
  padding: "0 0 2em 0",
};

let noBorder = {
  border: "none",
};

let blue = {
  color: "#0063B9",
};

let align = {
  alignItems: "center",
  textAlign: "center",
};

export default class Opportunity extends React.Component {
  render() {
    return (
      <div style={divPadding}>
        <Container>
          <Row className="justify-content-md-center" style={blue}>
            <h1>The Opportunity</h1>{" "}
          </Row>
          <div style={divPaddingInner}>
            <CardDeck>
              <Card style={noBorder}>
                <Card.Body>
                  <Card.Title className="text-center" style={blue}>
                    <h3>Data Science Today</h3>
                  </Card.Title>
                  <Card.Text style={align}>Coming Soon</Card.Text>
                </Card.Body>{" "}
                {/*Data Science Today*/}
              </Card>
              <Card style={noBorder}>
                <Card.Body>
                  <Card.Title className="text-center" style={blue}>
                    <h3>Our Niche</h3>
                  </Card.Title>
                  <Card.Text style={align}>Coming Soon</Card.Text>
                </Card.Body>{" "}
                {/*Our Niche*/} {/*Our Niche*/}
              </Card>
              <Card style={noBorder}>
                <Card.Body>
                  <Card.Title className="text-center" style={blue}>
                    <h3>Reach</h3>
                  </Card.Title>
                  <Card.Text style={align}>Coming Soon</Card.Text>
                </Card.Body>{" "}
                {/*Reach*/}
              </Card>
            </CardDeck>
          </div>
          <Card />
          <Card style={noBorder}>
            {" "}
            {/*this is the quote card*/}
            <blockquote className="blockquote mb-0 card-body">
              <h1>“Above all else, show the data.”</h1>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  American Statistician 
                  <cite title="Edward R. Tufte"> Edward R. Tufte</cite>
                </small>
              </footer>
            </blockquote>
          </Card>
        </Container>
      </div>
    );
  }
}
