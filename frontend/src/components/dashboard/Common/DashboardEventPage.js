import React from 'react'; 
import { Button, Form, Container } from "react-bootstrap"; 

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
    handleSubmit = (event) => {
        event.preventDefault(); 
        // console.log(this.props.firebase.event);
        this.props.firebase.event.create_event(this.state.name, this.state.desc, this.state.date, null, null);
        this.setState({name: '', desc: '', date: ''});
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
    render() {
        return (
            <div>
                <h2><strong>Edit Event</strong></h2>
            </div>
        )
    }
}

/**
 * @author Vidhur Kumar
 */
export default class DashboardEventPage extends React.Component {

    render() {
        return (
            <Container>
                <CreateEventForm firebase={this.props.firebase}/>
                <EditEventForm /> 
            </Container>
        )
    }
}