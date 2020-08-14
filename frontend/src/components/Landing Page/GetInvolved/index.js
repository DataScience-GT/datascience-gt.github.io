import React from 'react';
import { Button, Container, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

let divPadding = {
  padding: "4em 0 4em 0",
}

let divPaddingInner = {
  padding: "2em 0 2em 0",
}

let blue = {
  color: "#0063B9",
}

export default class GetInvolved extends React.Component {
  render() {
    return(
      <div style={divPadding}>
      <Container>
      <Row className="justify-content-md-center" style={blue}><h1>Get Involved</h1></Row>
      <div style={divPaddingInner}>
      <CardDeck>
      <Card>
        <Card.Body>
        <Card.Title className="text-center" style={blue}><h3>Donate</h3></Card.Title>
        <Card.Text>
          As a nonprofit, we rely on donations to keep us running. Right now, we're an all-volunteer staff but we have operational costs just like any company. Your donation will go towards helping expand our operations, increasing the quality of our materials, and allowing our staff to keep doing their job. Any donation, big or small, is an incredible help.
        </Card.Text>
        <div className="text-center">
          <Button variant="primary">Learn More</Button>
        </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
        <Card.Title className="text-center" style={blue}><h3>Become a Chapter</h3></Card.Title>
        <Card.Text>
          If you want to help bring the resources DSI has to offer to your community, consider starting a chapter! If you do start a chapter, you'll gain access to our bootcamp material, logistics expertise, funding, and sponsors. We'll help you set up a club that creates lasting value for your community – all you have to do is ask! Although new chapters are currently invitation-only, we'll be opening applications for new chapters online by January 2022. In the meantime, you can email us to let us know you're interested.
        </Card.Text>
        <div className="text-center">
          <Button variant="primary">Learn More</Button>
        </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
        <Card.Title className="text-center" style={blue}><h3>Sponsor Us</h3></Card.Title>
        <Card.Text>
          Sponsorships are our main source of funding, and we rely on benevolent organizations to continue our operations. All of our sponsors get recognized on our website, and have our gratitude! If you or your company are interested in sponsoring us, thank you! Click below to find out more information.
        </Card.Text>
        <div className="text-center">
          <Button variant="primary">Learn More</Button>
        </div>
        </Card.Body>
      </Card>
      </CardDeck>
      </div>
      </Container>
      </div>
    );
  }
}
