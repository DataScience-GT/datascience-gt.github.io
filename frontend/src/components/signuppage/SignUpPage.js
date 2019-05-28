/**
 * This is responsible for user sign-up. We collect data 
 * and then call the createUser function, which signs them up. 
 * Then, the process flows as normal; firebase signup followed 
 * by a document in our `/users` collection. 
 */
import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import { withFirebase } from '../Firebase';
import { compose } from 'recompose'; 
import {withRouter} from 'react-router-dom'; 
import * as ROUTES from '../../constants/routes'; 

class SignUpForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            email: "", 
            password: "", 
            first_name: "", 
            last_name: "", 
            phone_number: "", 
            verification: "", 
            verification_method: "venmo", 
            vs_amount: 0, 
            vs_person: ""
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
        try {
            await this.props.firebase.user.createUser(state.email, state.password, 
                state.first_name, state.last_name, state.alt_email, state.phone_number); 
            if (this.state.verification_method === "cash") {
                await this.props.firebase.user.updateUserVerificationCash(this.state.vs_amount, this.state.vs_person); 
            } else if (this.state.verification_method === "venmo") {
                this.props.firebase.user.updateUserVerificationVenmo(this.state.verification, this.state.verification.name); 
            }
            this.props.history.push(ROUTES.DASHBOARD); 
        } catch(err) {
            alert(err); 
            this.props.history.push(ROUTES.SIGNUP); 
        } 
    }

    getVerificationStub(method) {
        if (method === "venmo") {
            return (
                <Form.Group> 
                <Form.Label> Verification Picture</Form.Label>
                <Form.Control onChange={this.handleFileChange} name="verification" type="file" accept="image/png, image/jpg, image/jpeg" />
                </Form.Group>
            )
        } else if (method === "cash") {
            return (
                <Form.Group>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control name="vs_amount" onChange={this.handleInputChange} type="number"></Form.Control>
                    <Form.Label>Person you Paid To</Form.Label>
                    <Form.Control name="vs_person" onChange={this.handleInputChange} type="text"></Form.Control>
                </Form.Group> 
            )
        }
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

                {/* TODO: REMOVE THIS AND MOVE TO SECONDARY STAGE!!! 
                    This is where the user can select which payment method they prefer. 
                */}
                <Form.Group>
                    <Form.Label> Select preferred payment method </Form.Label>
                    <div>
                        <Form.Check inline onChange={this.handleInputChange} type="radio" name="verification_method" value="venmo" checked={this.state.verification_method === "venmo"} label="venmo" />
                        <Form.Check inline onChange={this.handleInputChange} type="radio" name="verification_method" value="cash" checked={this.state.verification_method === "cash"} label="cash" /> 
                        <Form.Check inline onChange={this.handleInputChange} type="radio" name="verification_method" value="defer" checked={this.state.verification_method === "defer"} label="defer" />  
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Text>More About You</Form.Text>
                </Form.Group>
                {this.getVerificationStub(this.state.verification_method)}
                <Button variant="primary" type="submit"> 
                    Sign Up 
                </Button>
            </Form>
        )
    }
}

const SignUpWithFirebase = compose(withRouter, withFirebase)(SignUpForm); 

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