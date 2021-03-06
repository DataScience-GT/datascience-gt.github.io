import React from 'react'; 
import { Button, Form, InputGroup, Container, Modal } from "react-bootstrap"; 
import Spinner from 'react-bootstrap/Spinner'
import {withRouter} from 'react-router-dom'; 
import DashboardNavbar from '../../Member Dashboard/Dashboard Navbar';
import { withAuthentication } from '../../../Session';
import { FirebaseContext } from '../../../Firebase';
import EventList from '../../Member Dashboard/Event List';

/**
 * The dashboard's event page for event creation, deletion, and modification.
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
            isLoading: true,
            name: "",
            desc: "",
            date: "",
            type: "General Meeting",
            XP: 0,
            meetingLink: "",
            resourceLink: ""
        }
    }

    componentDidMount() {
        this.viewEvents();
    }

    viewEvents = async () => {
        // await this.props.firebase.event.get_events().then(snapshot => {
        //     snapshot.docs.forEach(async doc => {
        //         let eventId = doc.id;
        //         let data = doc.data();
                
        //         console.log(data);
        //         // if(new Date(data['date']) < new Date() && !data.xpAdded) {
        //         // //     this.props.firebase.event.mark_event_xpAdded(eventId);
        //         // }
        //         // console.log(doc.data()['rsvp_list']);
        //         // if(doc.data()['rsvp_list'].length > 0) {
        //         //     let curr = doc.data()['rsvp_list'][0];
        //         //     this.props.firebase.user.get_user_from_name(curr.split(" ")[0], curr.split(" ")[1]).then(res => console.log(res));
        //         // }
        //         // console.log(doc.data()['date']);
        //         // console.log(new Date(doc.data()['date']) < new Date());
        //     })
        // })
        this.setState({isLoading: false});
    }

    /**
     * 
     */
    handleInputChange = async (event) => {
        await this.setState({[event.target.name]: event.target.value});
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
        await this.props.firebase.event.create_event(this.state.name, this.state.desc, this.state.XP, this.state.date, this.state.type, name, this.state.meetingLink, this.state.resourceLink);
        console.log(this.state);
        this.setState({name: '', desc: '', date: '', type: '', meetingLink: '', resourceLink: ''});
        document.location.reload(true);
    }

    /**
     * 
     */
    render() {
        return (
            this.state.isLoading ? <Spinner animation="border" size="xlg" /> :
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
                        <Form.Label>XP Points</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="XP" type="number" value={this.state.XP}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Event Date</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="date" type="date" value={this.state.date}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Meeting Link</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control onChange={this.handleInputChange} type="url" name="meetingLink" value={this.state.meetingLink}/>
                        </InputGroup>
                        <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Resources</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control onChange={this.handleInputChange} type="url" name="resourceLink" value={this.state.resourceLink}/>
                        </InputGroup>
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
            if(currrentEvent.data.name === eventName) {
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
                {/* <h1>HELLO</h1> */}
                <CreateEventForm firebase={this.props.firebase}/>
                <EditEventForm firebase={this.props.firebase}/> 
            </Container>
        )
    }
}

const DashboardEventPageWithFirebase = withRouter(withAuthentication(DashboardEventContainer));

export default class DashboardEventPage extends React.Component {
    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => {
                    return (
                        <div>
                            <DashboardNavbar firebase={firebase}/>
                            <DashboardEventPageWithFirebase />
                        </div>
                    )

                }}
            </FirebaseContext.Consumer>
        )
    }
}
