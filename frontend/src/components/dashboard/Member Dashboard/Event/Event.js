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
export class EventEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: this.props.event.data.name,
            desc: this.props.event.data.desc,
            date: this.props.event.data.date,
            type: this.props.event.data.type,
            show: this.props.show
        }

        this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
            this.setState({username: snapshot['first_name'] + ' ' + snapshot['last_name']});
        });
    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value}); 
    }

    handleSubmit = async () => {
        await this.props.firebase.event.update_event(this.props.event.id, this.state.name, this.state.desc, this.state.date, this.state.type);
    }

    handleDelete = async () => {
        await this.props.firebase.event.delete_event(this.props.event.id);
    }


    render() {
        const isEventOwnerContext = this.state.username !== this.props.event.data.owner;
        return (
            <Form>
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
                    <Form.Control onChange={this.handleInputChange} as="select" name="type">
                        <option selected={this.props.event.data.type === 'General Meeting'}>General Meeting</option>
                        <option selected={this.props.event.data.type === 'Workshop'}>Workshop</option>
                        <option selected={this.props.event.data.type === 'Project'}>Project</option>
                        <option selected={this.props.event.data.type === 'Special'}>Special</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="date" type="date" defaultValue={this.props.event.data.date}></Form.Control>
                </Form.Group>
                <Button disabled={isEventOwnerContext} onClick={this.handleSubmit} className="rsvp-button" variant="outline-success">Save</Button>
                <Button disabled={isEventOwnerContext} onClick={this.handleDelete} className="rsvp-button" variant="outline-danger">Delete</Button>
            </Form>
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
          username: ''
        };

        this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
            this.setState({username: snapshot['first_name'] + ' ' + snapshot['last_name']});
        });

        console.log(this.props.event.data);
      }

      handleClose = () => {
        this.setState({ show: false });
      }
    
      handleShow = () => {
        this.setState({ show: true });
      }

      handleClick = async () => {
      }

      handleSubmit = () => {
          if(this.props.isRSVP) {

          } else {
          }
      }
      
      render() {
        const modalTitle = this.props.isRSVP ? 'Event Description' : 'Edit Event'
        const modalBody = this.props.isRSVP ? this.props.event.data.desc :
                <EventEditForm handleSubmit={this.handleSubmit.bind(this)} event={this.props.event} firebase={this.props.firebase}/>;
        const eventLinks = this.props.event.data.links && this.props.event.data.links.length > 0 ?
        <Button variant="info"><a href={this.props.event.data.links[0]}>Files</a></Button> :
            null;
        return (
                <div>
                    <Card>
                        <Card.Body onClick={this.handleShow}>
                            <span><strong>{this.props.event.data.name}</strong></span>
                            <span className="event-type"><EventTypeBadge type={this.props.event.data.type}/></span>
                        </Card.Body>
                    </Card>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modalBody}
                            <br />
                            {eventLinks}
                        </Modal.Body>
                        {this.props.isRSVP &&
                            <Modal.Footer>
                                <Button className="rsvp-button" variant="outline-success">RSVP</Button>
                            </Modal.Footer>
                        }
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