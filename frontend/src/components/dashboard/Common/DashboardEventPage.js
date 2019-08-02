import React from 'react'; 
import { Button, Form, Container, Modal } from "react-bootstrap"; 
import {withRouter} from 'react-router-dom'; 
import DashboardNavbar from '../Member Dashboard/Navbar/DashboardNavbar';
import { withAuthentication } from '../../Session';
import { EventList } from '../Member Dashboard/Event/Event';

/**
 * @author Vidhur Kumar
 */
export class CreateEventForm extends React.Component {
    
    /**
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            desc: "",
            date: "",
            type: "",
        }
    }

    /**
     * 
     */
    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value}); 
    }

    /**
     * 
     */
    handleSubmit = async (event) => {
        event.preventDefault(); 
        // console.log(this.props.firebase.event);
        let name = '';
        await this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
            name = snapshot['first_name'] + ' ' + snapshot['last_name'];
        })
        await this.props.firebase.event.create_event(this.state.name, this.state.desc, this.state.date, this.state.type, name);
        this.setState({name: '', desc: '', date: '', type: ''});
    }

    /**
     * 
     */
    render() {
        return (
            <div>
                <h2><strong>Create Event</strong></h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="name" value={this.state.name}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event Description</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="desc" value={this.state.desc}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Event Type</Form.Label>
                        <Form.Control as="select" name="type" onChange={this.handleInputChange}>
                            <option>General Meeting</option>
                            <option>Workshop</option>
                            <option>Project</option>
                            <option>Special</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="date" type="date" value={this.state.date}></Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Create</Button>
                </Form>
            </div>
        )
    }
}

/**
 * @author Vidhur Kumar
 */
export class EditEventForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            selectedEventId: "",
            show: false,
        }

        // Pull the list of events from Firebase.
        this.populateEvents();
    }

    async populateEvents() {
        await this.props.firebase.event.get_events()
            .then(snapshot => {
                let events = this.state.events;
                snapshot.forEach(doc => {
                    events.push({id: doc.id, data: doc.data()});
                });
                this.setState({events: events});
            }).catch(err => {
                console.log('Error getting documents', err);
            });
    }

    componentDidMount() {
        setTimeout(1000, () => this.setState({selectedEventId: this.state.events[0]}));
    }

    
    /**
     * Returns the event from the events array with the specified event name.
     */
    getEventId = (eventName) => {
        for(let i in this.state.events) {
            let currrentEvent = this.state.events[i];
            if(currrentEvent.data.name ===  eventName) {
                return currrentEvent.id;
            }
        }

        return null;
    }

    handleInputChange = (event) => {
        this.setState({"selectedEventId": this.getEventId(event.target.value)}); 
        // console.log(this.state);
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    render() {
        // const eventItems = this.state.events.map(event => <option key={event.id}>{event.data.name}</option>);
        return (
            <div>
                
                <h2><strong>Edit Event</strong></h2>
                <EventList firebase={this.props.firebase}/>
            </div>
        )
    }
}

export class DashboardEventModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Description:</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClick} className="rsvp-button" variant="outline-success">RSVP</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

/**
 * @author Vidhur Kumar
 */
export class DashboardEventContainer extends React.Component {

    render() {
        return (
            <Container>
                <CreateEventForm firebase={this.props.firebase}/>
                <EditEventForm firebase={this.props.firebase}/> 
            </Container>
        )
    }
}

const DashboardEventPageWithFirebase = withRouter(withAuthentication(DashboardEventContainer));

export default class DashboardEventPage extends React.Component {

    componentDidMount() {
        console.log(this);
    }
    render() {
        return (
            <div>
                <DashboardNavbar />
                <DashboardEventPageWithFirebase />
            </div>
        )
    }
}