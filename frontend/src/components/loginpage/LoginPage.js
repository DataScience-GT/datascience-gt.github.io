import React from 'react';
import MenuBar from '../shared/MenuBar';
import { Button, Form, Container } from "react-bootstrap";
import { withFirebase } from '../Firebase';

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
    let res = await this.props.firebase.user.sign_in(this.state.email_addr, this.state.password); 
    console.log(res); 
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
const LoginWithFirebase = withFirebase(LoginForm); 
export default class LoginPage extends React.Component {
    render() {
        return (
          <div className="Login">
            <MenuBar />
            <Container>
            <LoginWithFirebase />
            </Container>
          </div>
        );
      }
}