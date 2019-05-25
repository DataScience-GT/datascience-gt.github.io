import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import { withFirebase } from '../Firebase';


class SignUpForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            email: "", 
            password: "", 
            first_name: "", 
            last_name: "", 
            phone_number: "", 
            verification: ""
        }; 

        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleFileChange = this.handleFileChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleInputChange(event) {
        const target = event.target; 
        const value = target.type === "checkbox" ? target.checked : target.value; 
        const name = target.name; 
        this.setState({
            [name]: value
        }); 
    }
    handleFileChange(event) {
        const target = event.target; 
        const file = target.files[0]; 
        this.setState({
            "verification": file
        }); 
    }
    async handleSubmit(event) {
        // try creating an account 
        event.preventDefault(); 
        let state = this.state; 
        await this.props.firebase.user.createUser(state.email, state.password, 
            state.first_name, state.last_name, state.alt_email, state.phone_number);
        this.props.firebase.user.updateUserVerification(2, this.state.verification, this.state.verification.name); 
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail"> 
                    <Form.Label>GT Email Address</Form.Label> 
                    <Form.Control onChange={this.handleInputChange} name="email" type="email" placeholder="Enter GT Email" /> 
                </Form.Group>

                {/* Password Entry - TODO Include Password Validation */}
                <Form.Group controlId="formBasicPassword">
                    <Form.Label> New Password </Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="password" type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="first_name" type="text" placeholder="First Name" />
                </Form.Group>

                <Form.Group> 
                    <Form.Label>Last Name</Form.Label> 
                    <Form.Control onChange={this.handleInputChange} name="last_name" type="text" placeholder="Last Name" /> 
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Alternate Email Address (i.e. gmail)</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="alt_email" type="email" placeholder="alternate email" /> 
                </Form.Group>

                <Form.Group>
                    <Form.Label> Phone Number </Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="phone_number" type="tel" placeholder="Phone Number" /> 
                </Form.Group>

                {/* TODO: REMOVE THIS AND MOVE TO SECONDARY STAGE!!! */}
                <Form.Group> 
                    <Form.Label> Verification Picture</Form.Label>
                    <Form.Control onChange={this.handleFileChange} name="verification" type="file" accept="image/png, image/jpg, image/jpeg" />
                </Form.Group>
                <Button variant="primary" type="submit"> 
                    Sign Up 
                </Button>
            </Form>
        )
    }
}

const SignUpWithFirebase = withFirebase(SignUpForm); 

export default class SignUpPage extends React.Component {
    render() {
        return (
            <div className="Login"> 
            <Container> 
                <SignUpWithFirebase /> 
            </Container>
            </div>
        )
    }
}