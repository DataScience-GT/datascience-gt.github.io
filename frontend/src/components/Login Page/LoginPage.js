/**
 * This file provides the login functionality. Upon login, 
 * the user is redirected to the dashboard. 
 */
import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import { withFirebase } from '../Firebase';
import * as ROUTES from "../../config/routes"; 
import { compose } from 'recompose'
import {withRouter} from 'react-router-dom'; 
import './LoginPage.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      email_addr: "", 
      password: "", 
      stay_signed_in: false
    }; 

    this.handleInputChange= this.handleInputChange.bind(this); 
    this.handleSubmit = this.handleSubmit.bind(this); 
  }

  handleInputChange(event) {
    const target = event.target; 
    // if it's a checkbox (i.e. stay signed out, we want to use the checked)
    const value = target.type === 'checkbox' ? target.checked: target.value; 
    const name = target.name; 
    this.setState({
      [name]: value
    })
  }

  async handleSubmit(event) {
    // sign user in 
    event.preventDefault(); 
    try {
      await this.props.firebase.user.sign_in(this.state.email_addr, this.state.password); 
      this.props.history.push(ROUTES.DASHBOARD); 
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        alert("Email not found - did you make a typo?"); 
      } else if (err.code === "auth/wrong-password") {
        alert("Wrong password - please try again"); 
      } else {
        console.log(err); 
      }
    }
  }
  render() {
    return (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control onChange={this.handleInputChange} name="email_addr" type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={this.handleInputChange} name="password" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group controlId="formBasicChecbox">
          <Form.Check onChange={this.handleInputChange} name="stay_signed_in" type="checkbox" label="Stay Signed In" />
      </Form.Group>
      <Button variant="primary" type="submit">
          Submit
      </Button>
    </Form>)
  }
}
const LoginWithFirebase = compose(withRouter, withFirebase)(LoginForm); 
export default class LoginPage extends React.Component {
    render() {
        return (
          <div className="Login">
            <Container className="box">
              <h1>Log in</h1>
              <LoginWithFirebase />
            </Container>
          </div>
        );
      }
}