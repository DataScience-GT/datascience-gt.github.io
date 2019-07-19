import React from 'react'; 
import {Badge, Button, Card, Modal} from 'react-bootstrap';
import './Event.css';

/**
 * 
 */
export class Event {
    constructor(name, date, desc) {
        this.name = name;
        this.date = date;
        this.desc = desc;
    }
}

/**
 * @author Vidhur Kumar
 */
export class EventTypeBadge extends React.Component {
    /**
     * Maps the specified event type to the corresponding badge variant.
     */
    mapTypeToBadgeVariant = (type) => {
        switch(type) {
            case "gm":
                return "primary";

            case "workshop":
                return "warning";

            case "special":
                return "danger";

            case "project":
                return "success";

            default:
                return "secondary";
        }
    }

    mapTypeToBadgeText = (type) => {
        switch(type) {
            case "gm":
                return "General Meeting";

            case "workshop":
                return "Workshop";

            case "special":
                return "Special";

            case "project":
                return "Project";

            default:
                return "Unknown";
        }
    }

    render() {
        return (
            <h5><Badge pill variant={this.mapTypeToBadgeVariant(this.props.type)}>{this.mapTypeToBadgeText(this.props.type)}</Badge></h5>
        );
    }
}

/**
 * @author Vidhur Kumar
 */
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
                        <Card.Body onClick={this.handleShow}>
                            <span><strong>{this.props.event.name}</strong></span>
                            <span className="event-type"><EventTypeBadge type={this.props.event.type}/></span>
                        </Card.Body>
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

/**
 * @author Vidhur Kumar
 */
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
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        const eventItems = this.state.events.map(event => <EventCard key={event.name} event={event}/>);
        return (
            <div>
                {eventItems}
            </div>
        )
    }
}