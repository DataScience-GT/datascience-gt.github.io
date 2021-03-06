import React from 'react';
import {Button, Form, FormGroup} from 'react-bootstrap';

import './EventEditForm.css';

/**
 * @author Vidhur Kumar
 */
export default class EventEditForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            owner: this.props.event.data.owner,
            name: this.props.event.data.name,
            desc: this.props.event.data.desc,
            date: this.props.event.data.date,
            meetingLink: this.props.event.data.links[0],
            resourceLink: this.props.event.data.links[1],
            type: this.props.event.data.type,
            XP: this.props.event.data.XP,
            show: this.props.show
        }
        console.log(this.state.meetingLink, this.state.resourceLink);
        this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
            this.setState({username: snapshot['first_name'] + ' ' + snapshot['last_name']});
        });
    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value}); 
    }


    render() {
        const isEventOwnerContext = this.state.username === this.props.event.data.owner;
        return (
            <Form>
                <FormGroup>
                    <Form.Label>Change Event Owner</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="owner" defaultValue={this.props.event.data.owner}></Form.Control>
                </FormGroup>
                <Form.Group>
                    <Form.Label>Edit Event Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="name" defaultValue={this.props.event.data.name}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Edit Event Description</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="desc" defaultValue={this.props.event.data.desc}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Edit XP Points</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="XP" type="number" defaultValue={this.props.event.data.XP}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Edit Event Date</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="date" type="date" defaultValue={this.props.event.data.date}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Edit Event Type</Form.Label>
                    <Form.Control onChange={this.handleInputChange} as="select" name="type">
                        <option selected={this.props.event.data.type === 'General Meeting'}>General Meeting</option>
                        <option selected={this.props.event.data.type === 'Workshop'}>Workshop</option>
                        <option selected={this.props.event.data.type === 'Project'}>Project</option>
                        <option selected={this.props.event.data.type === 'Special'}>Special</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Edit Meeting Link</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="meetingLink" type="url" defaultValue={this.props.event.data.links[0]}></Form.Control>
                    <Form.Label>Edit Resource Link</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="resourceLink" type="url" defaultValue={this.props.event.data.links[1]}></Form.Control>
                </Form.Group>
                {isEventOwnerContext && <div><strong>Event Code: {this.props.event.data.code}</strong></div>}
                <div className="event-button-container">
                    <Button disabled={!isEventOwnerContext} 
                            onClick={() => this.props.handleSubmit(this.props.event.id, this.state.name, this.state.desc, this.state.XP, this.state.date, this.state.meetingLink, this.state.resourceLink, this.state.type, this.state.owner)} className="rsvp-button" variant="outline-success">Save</Button>
                    <Button disabled={!isEventOwnerContext} 
                            onClick={() => this.props.handleDelete(this.props.event.id)} className="rsvp-button" variant="outline-danger">Delete</Button>
                    {isEventOwnerContext &&
                    <Button disabled={this.props.event.data.isOpen} 
                            onClick={() => this.props.handleOpenEvent(this.props.event.id)} className="rsvp-button" variant="outline-warning">Open Event</Button>
                    }
                </div>
            </Form>
        )
    }
}
