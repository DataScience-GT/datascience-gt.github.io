/**
 * This file should be the center point for dashboard building. In order to keep file sizes manageable, the 
 * actions themselves are in [[actions.js]] in this folder; those could probably be 
 * split up eventually because we will have a lot of actions. 
 */
import React from 'react'; 
// import { withFirebase } from '../Firebase'; 
import {Container, Row, Col, Button} from "react-bootstrap"; 
import {withRouter} from "react-router-dom"
// import {compose} from "recompose"; 
import {AuthUserContext, withAuthentication} from "../Session"; 
import {UserWelcomeHeader, XPBadge, ViewProfile, CreateGroupAction, DeleteGroupAction, CreateJoinRequestAction, TakeRequestAction, VerifyPendingUserAction} from "./actions"; 
import {EventList} from './Event/Event';
// import DashboardNavbar from './Navbar/DashboardNavbar';
import * as entity from "../Firebase/entity"; 
// import * as ROUTES from "../../constants/routes"
/**
 * TODO: Build some dashboard here. Currently just loads all actions that I created so I coud test them 
 * - Raj 
 */

const LoadingComponent = props => {return (
    "Loading your Dashboard"
)}

const actionMapping = {
    default: [ViewProfile, CreateGroupAction, DeleteGroupAction, CreateJoinRequestAction, TakeRequestAction], 
    finance: [VerifyPendingUserAction]
}

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'user': {}
        }
    }

    componentDidUpdate() {
        if(this.cached_user_id !== this.context.uid) {
            this.props.firebase.user.get_user(this.context.uid).then((user) => {
                this.setState({'user': user});
                console.log(this.state);
            })
        }
    }

<<<<<<< HEAD
=======
    getUnverifiedStub(membership_status) {

        if (membership_status === entity.MembershipStatus.pending) {
            return <p>Your membership confirmation is pending. We'll verify it within a few days. Apologies for the delay!</p>; 
        }
        if (membership_status === entity.MembershipStatus.suspended) {
            return (<p> Your account has been suspended. Please contact support at <a href="mailto:datascience.gt@gmail.com">datascience.gt@gmail.com</a> for assistance.</p>)
        }
    }
>>>>>>> c2320d889143712f8406c4668c7442ee5a51cbc5
    render() {

        return (
            // <h2>Welcome to your dashboard!</h2>
            // <UserWelcomeHeader />
            <Container>
                <DashboardNavbar />
                <Row>
                    <Col><UserWelcomeHeader user={this.state.user} /></Col>
                </Row>
                <Row>
                    <Col><XPBadge XP={this.state.user.XP}></XPBadge></Col>
                    <Col><EventList /></Col>
                </Row>
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
            <Container className="dashboard" style={{"paddingTop": "2vh"}}>
                <DashboardWithFirebase />
            </Container>
        )
    }
}

