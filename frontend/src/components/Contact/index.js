import React from "react";
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Footer from '../Footer';

let divPadding = {
  padding: "4em 0 4em 0",
}

let divPaddingInner = {
  padding: "2em 0 2em 0",
}

let blue = {
  color: "#0063B9",
}

class ContactForm extends React.Component {
  render() {
    return(
      <Form>
        <Form.Group controlId="contactName">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="Required field" />
        </Form.Group>
        <Form.Group controlId="contactEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Required field" />
        </Form.Group>
        <Form.Group controlId="contactMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
      <Button variant="primary" type="submit">
      Submit
      </Button>
      </Form>

    );
  }
}

export default class Contact extends React.Component {
  render() {
    return(
      <div>
      <Container style={divPadding}>
      <Row className="justify-content-md-center" style={blue}><h1>Contact</h1> </Row>
      <Row style={divPaddingInner}>
        <Col xs={0} sm={6} md={8}>
        Cras lacinia pulvinar ex. Integer mattis vitae tortor et bibendum. Praesent eu eros eget dolor interdum sollicitudin. Curabitur ac dolor non mi volutpat porta. Nullam dapibus eleifend metus, non fringilla quam interdum vel. Quisque tincidunt ut orci at faucibus. Nulla facilisi. Proin efficitur sapien sed massa feugiat pharetra. Sed non nisl sed lacus lobortis pellentesque non sed quam.

        Nullam volutpat tortor nec efficitur auctor. Sed imperdiet erat et turpis lacinia, et pulvinar nunc imperdiet. Maecenas sit amet tempus ipsum, ac volutpat leo. Nulla finibus quis lectus at fermentum. In ultricies ultricies tortor, vitae consectetur diam imperdiet cursus. Morbi tincidunt, enim et accumsan blandit, augue tortor sodales magna, eu elementum erat dolor eu nunc. Phasellus hendrerit finibus iaculis. Cras a ligula sollicitudin, consectetur purus at, aliquet dolor. Cras sapien massa, lobortis non urna molestie, blandit malesuada erat. Sed in felis tellus. Donec sem enim, pretium nec posuere ac, tempor et nibh. Nam at lorem tristique, aliquet enim at, consequat leo. Ut non ultrices lorem.
        </Col>
        <Col>
          <ContactForm />
        </Col>
      </Row>
      </Container>
      <Footer />
      </div>
    );
  }
}
