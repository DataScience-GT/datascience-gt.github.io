import React from 'react'; 
import {Button, Card, Modal} from 'react-bootstrap';
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
                    <Card.Body onClick={this.handleShow}>{this.props.event.name}</Card.Body>
                </Card>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Event Description:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.event.desc}</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClick} className="rsvp-button" variant="outline-success">RSVP</Button>
                    </Modal.Footer>
                </Modal>
                </div>
          )
      }
}

export class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }

        // Pull the list of events from Firebase.
        this.props.firebase.event.get_events().then(snapshot => {
            let events = this.state.events;
            snapshot.forEach(doc => {
                events.push(doc.data());
              });
              this.setState({events: events});
              console.log(this.state);
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        const eventItems = this.state.events.map(event => <EventCard event={event}/>);
        return (
            <div>
                {eventItems}
            </div>
        )
    }
}