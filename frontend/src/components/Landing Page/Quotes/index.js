import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Thumbs } from "react-responsive-carousel";
import * as ROUTES from "../../../config/routes";
import quotepic from './quote.png';

let quotes = [
  "“Statistics are like bikinis. What they reveal is suggestive, but what they conceal is vital.” —Aaron Levenstein", 
  "“If you can’t explain it simply, you don’t understand it well enough.” —Albert Einstein",
  "“In the end you should only measure and look at the numbers that drive action, meaning that the data tells you what you should do next.” —Alexander Peiniger",
  "“It is very common to find that the data to support many of the business information needs is simply not available at the levels required, or that it is of such bad quality that it is impossible to use. Resolution of these types of issues often requires fundamental changes to business processes.” —Alison Newell",
  "“It’s easy to lie with statistics It’s hard to tell the truth without statistics.” —Andrejs Dunkels",
  "“The world is one big data problem.” —Andrew McAfee",
]

let switchTime = 60; //in minutes

let chunk = {
  padding: "4em 1em",
  //border: "1px solid red",
};

let divPadding = {
  padding: "4em 0 4em 0",
};

let blue = {
  color: "#0063B9",
};

let h1style = {
  fontSize: "20px",
};

export default class WhatWeDo extends React.Component {
  constructor() {
    super();
    this.state = {loading: true, img: 0}
  }

  changeQuote = () => {
    if (this.state.img >= (quotes.length - 1)) {
      this.setState({img: 0});
    } else {
      this.setState({img: this.state.img+1})
    }
  }

  async componentDidMount() {
    this.setState({loading:false});
    setInterval(() => {
      this.changeQuote();
    }, 1000 * 60 * switchTime)
  }  

  render() {
    if(this.state.loading){
      return (
        <h1>loading...</h1>
      )
    }

    const {
      img
    } = this.state;

    return (
      <div>
        <div style={divPadding}>
          <Container>
            {/*centered column with quotes*/}
            <Row style={chunk}>
              <Col align="center">
                <Row>
                  <Col align="center">
                    <img src={quotepic} alt="quote" height="100px"/>
                  </Col>
                </Row>
                <Row>
                  <Col align="center">
                    <h1 style={h1style}>{quotes[img]}</h1>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
