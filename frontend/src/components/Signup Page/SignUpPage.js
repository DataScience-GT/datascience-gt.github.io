/**
 * This is responsible for user sign-up. We collect data 
 * and then call the createUser function, which signs them up. 
 * Then, the process flows as normal; firebase signup followed 
 * by a document in our `/users` collection. 
 */
import React from 'react';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { withFirebase } from '../Firebase';
import { compose } from 'recompose'; 
import {withRouter} from 'react-router-dom'; 
import * as ROUTES from '../../config/routes'
import * as CONSTANTS from "../../config/config"

class SignUpForm extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            email: "", 
            password: "", 
            first_name: "", 
            last_name: "",
            major: "",
            year: "Freshman",
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
                state.first_name, state.last_name, state.alt_email, state.major, state.year, state.phone_number); 
            if (this.state.verification_method === "cash") {
                await this.props.firebase.user.updateUserVerificationCash(this.state.vs_amount, this.state.vs_person); 
            } else if (this.state.verification_method === "venmo") {
                await this.props.firebase.user.updateUserVerificationVenmo(this.state.verification, this.state.verification.name); 
            }
            this.props.history.push(ROUTES.LOGIN); 
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
                        <Form.Control onChange={this.handleInputChange} name="alt_email" type="email" placeholder="Alternate Email" /> 
                    </Form.Group>

                    <Form.Group> 
                        <Form.Label>Major</Form.Label> 
                        <Form.Control onChange={this.handleInputChange} name="major" type="text" placeholder="Major" /> 
                    </Form.Group>

                    <Form.Group controlId="">
                        <Form.Label>Year</Form.Label>
                        <Form.Control onChange={this.handleInputChange} as="select" name="year" type="text">
                            <option>Freshman</option>
                            <option>Sophomore</option>
                            <option>Junior</option>
                            <option>Senior</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Phone Number </Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="phone_number" type="tel" placeholder="Phone Number" /> 
                    </Form.Group>

                    {/* TODO: REMOVE THIS AND MOVE TO SECONDARY STAGE!!! 
                        This is where the user can select which payment method they prefer. 
                    */}
                    <Row> 
                        <Col sm={6}>
                            <h3>Joining with Venmo</h3> 
                            <ol> 
                                <li> Venmo ${CONSTANTS.DUES_SEMESTER} for a semester membership, 
                                or ${CONSTANTS.DUES_YEAR} for a year membership, to @datascience-gt </li>
                                <li> Take a screenshot of your payment </li>
                                <li> Click the signup button, fill out the form, select "Venmo", and attach your screenshot</li>
                                <li> Hit "Submit", and you're all done! We'll verify your payment and send you an invite 
                                    to the slack within a few days. Welcome to the team! 
                                </li>
                            </ol>
                        </Col>
                        <Col sm={6}>
                            <h3> Joining with Cash </h3> 
                            Don't have a Venmo? Refuse to use online payments to stick it to our corporate overlords? 
                            No problem. 
                            <ol>
                                <li> Pay in cash to any member of the DSGT Team </li>
                                <li> Get their name when you pay them! </li>
                                <li> Go to the signup form, fill it out, select "Cash" and put in the amount you paid along with 
                                    the name of the person you gave cash to. 
                                    It's ${CONSTANTS.DUES_SEMESTER} for a semester, or ${CONSTANTS.DUES_YEAR} for a year. 
                                </li>
                                <li> Hit submit and you're done! It might take us a few days to verify your payment, but 
                                    once we do we'll send you a invite to our Slack channel and hook you up with the getting 
                                    started material. Glad to have you on the team! 
                                </li>
                            </ol>
                        </Col>
                    </Row>
                    <Form.Group>
                        <Form.Label> Select preferred payment method </Form.Label>
                        <div>
                            <Form.Check inline onChange={this.handleInputChange} type="radio" name="verification_method" value="venmo" checked={this.state.verification_method === "venmo"} label="Venmo" />
                            <Form.Check inline onChange={this.handleInputChange} type="radio" name="verification_method" value="cash" checked={this.state.verification_method === "cash"} label="Cash" /> 
                            <Form.Check inline onChange={this.handleInputChange} type="radio" name="verification_method" value="defer" checked={this.state.verification_method === "defer"} label="Defer" />  
                        </div>
                    </Form.Group>
                    {this.getVerificationStub(this.state.verification_method)}
                    {/* <Form.Group>
                        <Form.Text>More About You</Form.Text>
                    </Form.Group> */}

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
                <h1>Looking to join us? Sign up here!</h1>                
                <SignUpWithFirebase /> 
            </Container>
            </div>
        )
    }
}