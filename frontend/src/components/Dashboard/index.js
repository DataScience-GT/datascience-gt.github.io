import React from 'react'; 
import {withRouter} from "react-router-dom"
import {AuthUserContext, withAuthentication} from "../Session"; 
import DashboardNavbar from './Member Dashboard/Dashboard Navbar';
import DashboardHomePage from './Common/Home Page';
import { FirebaseContext } from '../Firebase';
import {MembershipStatus} from "../Firebase/entity"; 

import { Button, Form, Container, Row, Col } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner'
import * as ROUTES from '../../config/routes'
import * as CONSTANTS from "../../config/config"

/**
 * This file should be the center point for dashboard building. In order to keep file sizes manageable, the 
 * actions themselves are in [[actions.js]] in this folder; those could probably be 
 * split up eventually because we will have a lot of actions. 
 * @author Raj Shrimali and Vidhur Kumar
 */
class Dashboard extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            user: {},
            current_tab: 'home',
        }
    }

    componentDidUpdate() {
        if(this.cached_user_id !== this.context.uid) {
            this.getCurrentUser();
        }
    }

    async getCurrentUser() {
        await this.props.firebase.user.get_user(this.context.uid).then((user) => {
                this.setState({user: user, isLoading: false});
            });
    }

    handleClick = (event) => {
        this.setState({current_tab: event.target.name});
    }

    render() {
        return (
            this.state.isLoading ?   <Spinner animation="border" size="xlg" /> :
            <FirebaseContext.Consumer>
                {firebase => {
                    if (this.state.user.membership_status === MembershipStatus.pending && this.state.user.verification_uri === "") {
                        return (<div><UnverifiedComponent user={this.state.user} firebase={firebase} /></div>)
                    } else if (this.state.user.membership_status === MembershipStatus.pending) {
                        return (
                            <Container>
                                <h2>We're working on confirming your membership status, and we appreciate your patience. Please give us 1-2 days to confirm.</h2>
                            </Container>
                        )
                    } else {
                    return (
                            <div>
                                <DashboardNavbar click={this.handleClick} firebase={firebase}/>
                                <DashboardHomePage user={this.state.user} firebase={firebase}/>
                            </div>
                            )
                        }}
                    }
            </FirebaseContext.Consumer>
        )
    }
}
class UnverifiedComponent extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            verification: "", 
            verification_method: "venmo", 
            vs_amount: 0, 
            vs_person: ""

        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 

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
        try {
            if (this.state.verification_method === "cash") {
                console.log("Updating Cash")
                await this.props.firebase.user.updateUserVerificationCash(this.state.vs_amount, this.state.vs_person); 
            } else if (this.state.verification_method === "venmo") {
                await this.props.firebase.user.updateUserVerificationVenmo(this.state.verification, this.state.verification.name); 
            }
        } catch(err) {
            alert(err); 
            this.props.history.push(ROUTES.LOGIN); 
        } 
    }

    render() {
        return (
        <Container> 
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
            <Form onSubmit={this.handleSubmit}> 
            
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
        </Container>
        )
    }
}
// class Dashboard extends React.Component {
//     constructor(props) {
//         super(props); 
//         this.state = {
//             "current_render":  LoadingComponent, 
//             "actions": [], 
//             "user": {}, 
//             "reverseMap": {}
//         }
//         this.getDashboard = this.getDashboard.bind(this);
//         this.getUnverifiedStub = this.getUnverifiedStub.bind(this);  
//         this.selectAction = this.selectAction.bind(this);
//         this.cached_user_id = null;
//         this.first_render_only = true; 
//     }
//     componentDidUpdate() {
//         if (this.context === null) {
//             console.log(this.context, this);
//         } else {
           
//             if (this.cached_user_id !== this.context.uid) {
//                 this.props.firebase.user.get_user(this.context.uid).then((user) => {
//                     if (this.first_render_only) {
//                         this.setState({current_render: UserWelcomeHeader});
//                         this.first_render_only = false; 
//                     }
//                     let newActions = actionMapping.default;
//                     let newReverseMap = {};
//                     user.groups.forEach(group => {
//                         if(actionMapping[group]) {
//                             newActions = newActions.concat(actionMapping[group]);
//                         }
//                     })
//                     newActions.forEach(action => {
//                         newReverseMap[action.descriptor] = action;
//                     })
//                     this.setState({"actions": newActions, "reverseMap":  newReverseMap, "user": user}); 
//                     this.cached_user_id = this.context.uid;
//                 }); 
//             }
//         }
//     }
//     selectAction(event) {
//         event.preventDefault(); 
//         this.setState({"current_render": this.state.reverseMap[event.target.name]})
//     }
//     getDashboard() {
//         return (
//             <Row>
//                 <Col key={UserWelcomeHeader} sm={12} lg={3}>
//                 <Col key={ViewProfile}></Col>
//                     {/* <Container>
//                         <Row key={UserWelcomeCard}></Row>
//                     </Container> */}
//                     {/* <Container>
//                         <Row>
//                             <h3>Actions</h3>
//                         </Row>
//                         {this.state.actions.map(action => {return (
//                             <Row key={action}>
//                                 <Button name={action.descriptor} onClick={this.selectAction}>{action.descriptor}</Button>
//                             </Row>
//                         )})}
//                     </Container> */}
//                 </Col>
//                 <Col>
//                     <Row> 
//                         <h3>{this.state.current_render.descriptor}</h3>
//                     </Row>
//                     <Row>
//                         {React.createElement(this.state.current_render, {authUser: this.context, firebase: this.props.firebase, user: this.state.user})}
//                     </Row>
//                 </Col>
//             </Row>
//             // <div>
//             // <CreateGroupAction firebase={this.props.firebase} authUser={this.authUser}/> 
//             // <br/>
//             // <DeleteGroupAction firebase={this.props.firebase} authUser={this.authUser}/>
//             // <br/>
//             // <CreateJoinRequestAction firebase={this.props.firebase} authUser={this.authUser}/>
//             // <TakeRequestAction firebase={this.props.firebase} authUser={this.authUser}/>
//             // <VerifyPendingUserAction firebase={this.props.firebase} authUser={this.authUser}></VerifyPendingUserAction>
//             // </div>
//         )
//     }

//     getUnverifiedStub(membership_status) {
//         if (membership_status === entity.MembershipStatus.pending) {
//             return "Your membership confirmation is pending. We'll verify it within a few days. Apologies for the delay!"; 
//         }
//         if (membership_status === entity.MembershipStatus.suspended) {
//             return (<p> Your account has been suspended. Please contact support at <a href="mailto:datascience.gt@gmail.com">datascience.gt@gmail.com</a> for assistance.</p>)
//         }
//     }
//     render() {
//         return (
//             <Container> 
//                 {this.state.user.membership_status === entity.MembershipStatus.pending || 
//                     this.state.user.membership_status === entity.MembershipStatus.suspended ? this.getUnverifiedStub(this.state.user.membership_status) : this.getDashboard()}
//             </Container>
//         )
//     }
// }

Dashboard.contextType = AuthUserContext;
const DashboardWithFirebase = withRouter(withAuthentication(Dashboard));

export default class DashboardPage extends React.Component{
    render() {
        return (
            <DashboardWithFirebase />
        )
    }
}

