import React from 'react'; 
import {Button, Accordion, Card, Modal} from 'react-bootstrap';
import './Event.css';

export class Event {
    constructor(name, date, desc) {
        this.name = name;
        this.date = date;
        this.desc = desc;
    }
}

export class EventCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }

      handleClose = () => {
        this.setState({ show: false });
      }
    
      handleShow = () => {
        this.setState({ show: true });
      }

      handleClick = () => {
        alert('You have RSVPd!');
      }
      
      render() {
          return (
            <div>
                <Card>
                    <Card.Body onClick={this.handleShow}>EVENT<Button onClick={this.handleClick} class="rsvp-button" variant="outline-success">RSVP</Button></Card.Body>
                </Card>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Event Description:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>blah blah blah...</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
          )
      }
}

export class EventList extends React.Component {

    // TODO: Dynamically render event cards with all the events.
    render() {
        return (
            <EventCard />
        )
    }
}