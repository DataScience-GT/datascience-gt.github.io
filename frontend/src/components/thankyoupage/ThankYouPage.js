import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './ThankYouPage.css';

export default class ThankYouPage extends React.Component {

    render() {
        return (
            <Container>
                  <h1>Thank you for signing up!</h1>
                  <Button variant="primary" href="/">Back to home</Button>
            </Container>
        )
    }
}