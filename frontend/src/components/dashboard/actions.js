import React from 'react'; 
import { Button, Form, Container } from "react-bootstrap";

export class DashboardAction extends React.Component {
    constructor(props) {
        super(props)
        this.user = (this.props.firebase.user.get_user(props.authUser.uid));
    }
    render() {
        return;
    }
}

export class CreateGroupAction extends DashboardAction {
    constructor(props) {
        super(props); 
        this.state = {
            name: "" 
        }; 
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleInputChange(event) {
        this.setState({name: event.target.value}); 
    }

    handleSubmit(event) {
        event.preventDefault(); 
        const name = this.state.name; 
        this.props.firebase.group.create_group(name); 
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>New Group Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        )
    }
}

export class DeleteGroupAction extends DashboardAction {
    constructor(props) {
        super(props); 
        this.state = {
            name: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.setup_groups_available();
    }
    async setup_groups_available() {
        const availale_groups = await this.props.firebase.group.get_groups();
        this.groups_available = availale_groups.map(group => 
            <li>{group}</li>
        )

    }
    handleInputChange(event){
        this.setState({name: event.target.value}); 
    }

    handleSubmit(event) {
        event.preventDefault(); 
        const name = this.state.name; 
        this.props.firebase.group.delete_group(name); 
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <p>Available Groups: </p>
                <ul>{this.groups_available}</ul>
                <Form.Group>
                    <Form.Label>Delete Group Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Delete</Button>
            </Form>
        )
    }
}