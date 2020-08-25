import React from "react";
import { Container } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import portrait from '../assets/portrait.png';

var divPadding = {
  padding: "4em 0 4em 0",
}

var divPaddingInner = {
  padding: "0 0 2em 0",
}

var noBorder = {
  border: "none",
}


var lightBlue = {
  backgroundColor: "#F1F9FF",
}

export default class Events extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container>
      <div style={divPaddingInner}>
      <CardDeck className="text-center">
        <Card style={noBorder}> {/*First Chapter*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>First Chapter</h4></Card.Title>
          <Card.Text>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
          </Card.Text>
          </Card.Body>
        </Card>
        <Card style={noBorder}> {/*C1 Game Night*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Correlation One Game Night 2018</h4></Card.Title>
          <Card.Text>
            In partnership with Correlation One and Citadel, we hosted a data science coding competition with over 60 participants.
          </Card.Text>
          </Card.Body>
        </Card>
        <Card style={noBorder}> {/*Hacklytics 2019*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Hacklytics 2019</h4></Card.Title>
          <Card.Text>
            Our premier data science hackathon featured 80 attendees hacking for 12 hours to create cool projects like an analysis of Atlanta City Council minutes and an AI model to detect cancer.
          </Card.Text>
          </Card.Body> {/*Reach*/}
        </Card>
        <Card style={noBorder}> {/*Fall 2019 Kickoff*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Fall Kickoff 2019</h4></Card.Title>
          <Card.Text>
          Our second kickoff drew a mind-blowing 175 attendees, motivating us to launch the Data Science Initiative and taking our organization to new heights.
          </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      <CardDeck>
        <Card style={noBorder}> {/*KPMG Ignite*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>KPMG Ignite: Artificial Intelligence in the Enterprise</h4></Card.Title>
          <Card.Text>
          Lorem ipsum dolor sit amet, consectetur
          adipiscing elit.
          </Card.Text>
          </Card.Body>
        </Card>
        <Card style={noBorder}> {/*Fireside Chat w/PnG*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Fireside Chat with P&G</h4></Card.Title>
          <Card.Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Card.Text>
          </Card.Body>
        </Card>
        <Card style={noBorder}> {/*Terminal Live*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Terminal Live at Georgia Tech</h4></Card.Title>
          <Card.Text>
            The second iteration of the C1 Game Night, Terminal Live, drew 60 participants who had a great time developing algorithms to compete in Correlation One's challenge.
          </Card.Text>
          </Card.Body>
        </Card>
        <Card style={noBorder}> {/*Hacklytics 2020*/}
        <Card.Img src={portrait}/>
          <Card.Body style={lightBlue}>
          <Card.Title className="text-center"><h4>Hacklytics 2020</h4></Card.Title>
          <Card.Text>
          Our second ever annual Hacklytics with over 400 applicants and 12 sponsors was our largest-ever event.
          </Card.Text>
          </Card.Body> {/*Reach*/}
        </Card>
      </CardDeck>
      </div>
      </Container>
      </div>
    );
  }
}
