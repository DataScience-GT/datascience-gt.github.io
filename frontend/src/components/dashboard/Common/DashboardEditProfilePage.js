import React from 'react'; 
import { Button, Form, Container } from "react-bootstrap";
import {withRouter} from 'react-router-dom'; 
import DashboardNavbar from '../Member Dashboard/Navbar/DashboardNavbar';
import { AuthUserContext, withAuthentication } from '../../Session';

/**
 * @author Vidhur Kumar
 */
export class DashboardEditProfileContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            userData: {},
            gt_email: '',
            first_name: '',
            last_name: '',
            alt_email: '',
            major: '',
            year: '',
            phone_number: '',
        }
    }

    componentDidUpdate() {
        this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid()).then(snapshot => {
            this.setState({userData: snapshot});
        });
    }

    handleInputChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = () => {
        // this.props.firebase.user.update_user(
        //     this.props.firebase.user.get_current_uid(), 
        //     this.state.gt_email, 
        //     this.state.first_name, 
        //     this.state.last_name,
        //     this.state.alt_email,
        //     this.state.major,
        //     this.state.year,
        //     this.state.phone_number
        // );
        console.log(this.state);
        alert('here');
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail"> 
                        <Form.Label>GT Email Address</Form.Label> 
                        <Form.Control onChange={this.handleInputChange} name="gt_email" type="email" defaultValue={this.state.userData.gt_email} /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="first_name" type="text" defaultValue={this.state.userData.first_name} />
                    </Form.Group>

                    <Form.Group> 
                        <Form.Label>Last Name</Form.Label> 
                        <Form.Control onChange={this.handleInputChange} name="last_name" type="text" defaultValue={this.state.userData.last_name}/> 
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Alternate Email Address (i.e. gmail)</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="alt_email" type="email" defaultValue={this.state.userData.alt_email} /> 
                    </Form.Group>

                    <Form.Group> 
                        <Form.Label>Major</Form.Label> 
                        <Form.Control onChange={this.handleInputChange} name="major" type="text" defaultValue={this.state.userData.major} /> 
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
                        <Form.Control onChange={this.handleInputChange} name="phone_number" type="tel" defaultValue={this.state.userData.phone_number} /> 
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

DashboardEditProfileContainer.contextType = AuthUserContext;
const DashboardEditProfilePageWithFirebase = withRouter(withAuthentication(DashboardEditProfileContainer));

export default class DashboardEditProfilePage extends React.Component {
    render() {
        return (
            <div>
                <DashboardNavbar />
                <DashboardEditProfilePageWithFirebase />
            </div>
        )
    }
}