import React from 'react'; 
import { Button, Form, InputGroup, Container, Modal } from "react-bootstrap"; 
import Spinner from 'react-bootstrap/Spinner'
import {withRouter} from 'react-router-dom'; 
import DashboardNavbar from '../../../Member Dashboard/Dashboard Navbar';
import { withAuthentication } from '../../../../Session';
import { FirebaseContext } from '../../../../Firebase';
import EventList from '../../../Member Dashboard/Event List';

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
            link: "",
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
        await this.props.firebase.event.create_event(this.state.name, this.state.desc, this.state.XP, this.state.date, this.state.type, name, this.state.link);
        console.log(this.state);
        this.setState({name: '', desc: '', date: '', type: '', link: ''});
        document.location.reload(true);
    }

    /**
     * 
     */
    render() {
        return (
            this.state.isLoading ? <Spinner animation="border" size="xlg" /> :
            <div>
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
                            <InputGroup.Text>Event Files Link</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control onChange={this.handleInputChange} type="url" name="link" value={this.state.link}/>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary" type="submit">Create</Button>
                </Form>
            </div>
        )
    }
}

export class DashboardCreateEventContainer extends React.Component {

    render() {
        return (
            <Container>
                <h2><strong>Create Event</strong></h2>
                <CreateEventForm firebase={this.props.firebase}/>
            </Container>
        )
    }
}

const DashboardCreateEventPageWithFirebase = withRouter(withAuthentication(DashboardCreateEventContainer));

export default class DashboardCreateEventPage extends React.Component {
    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => {
                    return (
                        <div>
                            <DashboardNavbar firebase={firebase}/>
                            <DashboardCreateEventPageWithFirebase />
                        </div>
                    )

                }}
            </FirebaseContext.Consumer>
        )
    }
}