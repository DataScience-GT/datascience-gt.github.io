import React from "react";
import { Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Footer from '../Footer';
import Navigation from '../Navigation';

import portrait from './assets/portrait.png';

let divPadding = {
  padding: "4em 0 4em 0",
}

let divPaddingInner = {
  padding: "2em 0 2em 0",
}

let noBorder = {
  border: "none",
}

let blue = {
  color: "#0063B9",
}

let midBlue = {
  color: "white",
  backgroundColor: "#7FC4FD",
  fontWeight: "bold",
}

let lightBlue = {
  backgroundColor: "#F1F9FF",
}

export default class Projects extends React.Component {
  render() {
    return(
      <div>
      <div style={divPadding}>
      <Row className="justify-content-md-center" style={blue}><h1>Projects</h1> </Row>
      <Container>
      <div style={divPaddingInner}>
      <CardDeck className="text-center">
        <Card style={noBorder}> {/*Mentra*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Mentra</h4></Card.Title>
          <Card.Text>
            The Mentra Team is currently working on developing a Natural Language Processing (NLP) classifier that can group any given job description into a group of skills that are necessary to succeed in that job. This will help the start-up Mentra in their goal to design an employment-matching system for individuals on the autism spectrum.
          </Card.Text>
          </Card.Body>
          <Card.Footer style={midBlue}>In Development</Card.Footer>
        </Card>
        <Card style={noBorder}> {/*Stormalytics*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Stormalytics</h4></Card.Title>
          <Card.Text>
            The National Weather Service uses outdates, stats-based models to try to predict tornadoes. Using tornado records, and the available rich doppler data, DSGT is trying to build an intelligent tornado activity prediction system. We hope to be able to predict tornadoes earler than the current standard, saving lives in the process.
          </Card.Text>
          </Card.Body>
          <Card.Footer style={midBlue}>In Development</Card.Footer>
        </Card>
        <Card style={noBorder}> {/*FYNAT*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>FYNAT</h4></Card.Title>
          <Card.Text>
          Students are often overwhelmed by the seemingly infinite amount of organizations when they come to campus. FYNAT hopes to utilize user-submitted data to connet those who have similar interests and use profiles of students to match them to a club or organization, taking some of the initial anxiety and fear out of the freshman college experience.
          </Card.Text>
          </Card.Body>
          <Card.Footer style={midBlue}>In Development</Card.Footer>
        </Card>
      </CardDeck>
      <CardDeck className="text-center">
        <Card style={noBorder}> {/*Geosyntec Data Managemnet*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Geosyntec Data Management</h4></Card.Title>
          <Card.Text>
            The Geosyntec Project revolved around creating a unified data management application that can convert xml files into a more user friendly format, specifically that of a SQL or Microsoft Access Database.
          </Card.Text>
          </Card.Body>
          <Card.Footer style={midBlue}>In Development</Card.Footer>
        </Card>
        <Card style={noBorder}> {/*Opioid Awareness*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Opioid Awareness</h4></Card.Title>
          <Card.Text>
            The Opioid Awareness Project will be working closely with the Fulton Country Department of Behavioral Health & Developmental Disabilities to develop informational material about the risks associated with opioid usage online and analyzing data with Python-Oriented Data Science libraries to generate visuals.
          </Card.Text>
          </Card.Body>
          <Card.Footer style={midBlue}>In Development</Card.Footer>
        </Card>
        <Card style={noBorder}> {/*Kaggle Projects*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Kaggle Projects</h4></Card.Title>
          <Card.Text>
          The Opioid Awareness Project will be working closely with the Fulton Country Department of Behavioral Health & Developmental Disabilities to develop informational material about the risks associated with opioid usage online and analyzing data with Python-Oriented Data Science libraries to generate visuals.
          </Card.Text>
          </Card.Body>
          <Card.Footer style={midBlue}>In Development</Card.Footer>
        </Card>
      </CardDeck>
      </div>
      </Container>
      </div>
      <Footer />
      </div>
    );
  }
}
