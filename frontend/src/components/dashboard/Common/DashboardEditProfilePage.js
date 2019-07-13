import React from 'react'; 
import { Button, Form, Container } from "react-bootstrap";

export default class DashboardEditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }

        console.log(this.props.firebase.user);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail"> 
                        <Form.Label>GT Email Address</Form.Label> 
                        <Form.Control onChange={this.handleInputChange} name="email" type="email" placeholder="Enter GT Email" /> 
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

                    {/* <Form.Group>
                        <Form.Text>More About You</Form.Text>
                    </Form.Group> */}

                    <Button variant="primary" type="submit"> 
                        Submit changes
                    </Button>

                </Form>    
            </Container>    
        )
    }
}