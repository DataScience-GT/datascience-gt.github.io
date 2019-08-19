import React from 'react'; 
import { Button, Form, Container } from "react-bootstrap";
import {withRouter} from 'react-router-dom'; 
import DashboardNavbar from '../../Member Dashboard/Navbar/DashboardNavbar';
import firebase from 'firebase';
import { FirebaseContext } from '../../../Firebase';
import { AuthUserContext, withAuthentication } from '../../../Session';
import { throwStatement } from '@babel/types';

/**
 * The dashboard's edit profile page. Used to change any personal information, upload resumes, etc.
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
            resume: null,
        }
    }

    componentDidMount() {
        this.populate_events();

        // this.props.firebase.event.get_events().then(snapshot => {
        //     snapshot.docs.forEach(doc => {
        //         console.log(doc.data());
        //     })
        // })
    }

    async populate_events() {
        await firebase.auth().onAuthStateChanged((user) => {
            this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid()).then(snapshot => {
                this.setState({
                    userData: snapshot,
                    gt_email: snapshot['gt_email'], 
                    first_name: snapshot['first_name'],
                    last_name: snapshot['last_name'],
                    alt_email: snapshot['alt_email'],
                    major: snapshot['major'],
                    year: snapshot['year'],
                    phone_number: snapshot['phone_number']
                });
        });
        })
    }

    handleInputChange = async (event) => {
        // console.log(event.target);
        await this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    handleFileInputChange = async (event) => {
        const target = event.target; 
        const file = target.files[0]; 
        console.log(file);
        this.setState({
            resume: file
        });
    }

    handleSubmit = async () => {
        await this.props.firebase.user.update_user(this.props.firebase.user.get_current_uid(), this.state.gt_email, this.state.first_name, this.state.last_name,
                this.state.alt_email, this.state.major, this.state.year, this.state.phone_number);
        if(this.state.resume != null) {
            await this.props.firebase.user.update_user_resume(this.props.firebase.user.get_current_uid(), this.state.resume);
        }
        document.location.reload(true);
    }

    render() {
        return (
            <Container>
                <Form>
                    <Form.Group controlId="formBasicEmail"> 
                        <Form.Label>GT Email Address</Form.Label> 
                        <Form.Control onChange={this.handleInputChange} name="gt_email" type="email" value={this.state.gt_email} /> 
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
                            <option selected={this.state.userData.year === 'Freshman'}>Freshman</option>
                            <option selected={this.state.userData.year === 'Sophomore'}>Sophomore</option>
                            <option selected={this.state.userData.year === 'Junior'}>Junior</option>
                            <option selected={this.state.userData.year === 'Senior'}>Senior</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Phone Number </Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="phone_number" type="tel" defaultValue={this.state.userData.phone_number} /> 
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Upload Resume (PDF only)</Form.Label>
                        <Form.Control onChange={this.handleFileInputChange} name="resume" type="file" accept=".pdf"/>
                    </Form.Group>

                    {/* TODO: REMOVE THIS AND MOVE TO SECONDARY STAGE!!! 
                        This is where the user can select which payment method they prefer. 
                    */}

                    {/* <Form.Group>
                        <Form.Text>More About You</Form.Text>
                    </Form.Group> */}

                    <Button onClick={this.handleSubmit} variant="primary" type="button"> 
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
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FirebaseContext.Consumer>
            {firebase => {
                return (
                    <div>
                        <DashboardNavbar firebase={firebase}/>
                        <DashboardEditProfilePageWithFirebase />
                    </div>
                )

            }}
            </FirebaseContext.Consumer>
        )
    }
}