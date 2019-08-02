import React from 'react'; 
import {Badge, Button, Card, Modal, Form} from 'react-bootstrap';
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
            case "General Meeting":
                return "primary";

            case "Workshop":
                return "warning";

            case "Special":
                return "danger";

            case "Project":
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
            <h5><Badge pill variant={this.mapTypeToBadgeVariant(this.props.type)}>{this.props.type}</Badge></h5>
        );
    }
}

/**
 * @author Vidhur Kumar
 */
export class EventRSVPModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Description:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.event.data.desc}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.rsvp(this.props.event.id)} className="rsvp-button" variant="outline-success">RSVP</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

/**
 * @author Vidhur Kumar
 */
export class EventEditModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.event.data.name,
            desc: this.props.event.data.desc,
            type: this.props.event.data.type,
            date: this.props.event.data.date,
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control onChange={this.handleInputChange} name="name" defaultValue={this.props.event.data.name}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Description</Form.Label>
                            <Form.Control onChange={this.handleInputChange} name="desc" defaultValue={this.props.event.data.desc}></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Type</Form.Label>
                            <Form.Control as="select">
                                <option>General Meeting</option>
                                <option>Workshop</option>
                                <option></option>
                                <option>Special</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Event Date</Form.Label>
                            <Form.Control onChange={this.handleInputChange} name="date" type="date" defaultValue={this.props.event.data.date}></Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="rsvp-button" variant="outline-info">Save</Button>
                </Modal.Footer>
            </Modal>
        )
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

      handleClick = async () => {
        let name = '';
        await this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
            name = snapshot['first_name'] + ' ' + snapshot['last_name'];
        })

        console.log(this.props.event);
        // this.props.firebase.event.rsvp_to_event(this.props.event.id, name);
        // alert('You have RSVPd!');
      }
      
      render() {
          const modal = this.props.isRSVP ? <EventRSVPModal show={this.state.show} event={this.props.event} rsvp={() => this.handleClick} handleClose={() => this.handleClose}/> :
            <EventEditModal show={this.state.show} event={this.props.event} handleClose={() => this.handleClose}/>;
          return (
                <div>
                    <Card>
                        <Card.Body onClick={this.handleShow}>
                            <span><strong>{this.props.event.data.name}</strong></span>
                            <span className="event-type"><EventTypeBadge type={this.props.event.data.type}/></span>
                        </Card.Body>
                    </Card>
                    {modal}
                    {/* <EventRSVPModal show={this.state.show} event={this.props.event} handleClose={this.handleClose}/> */}
{/* 
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Event Description:</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.props.event.desc}</Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleClick} className="rsvp-button" variant="outline-success">RSVP</Button>
                        </Modal.Footer>
                    </Modal> */}
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
                events.push({id: doc.id, data: doc.data()});
              });
              this.setState({events: events});
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        const eventItems = this.state.events.map(event => <EventCard key={event.data.name} event={event} isRSVP={this.props.isRSVP} firebase={this.props.firebase}/>);
        return (
            <div>
                {eventItems}
            </div>
        )
    }
}