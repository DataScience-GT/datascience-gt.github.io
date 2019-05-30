/**
 * This file should be the center point for dashboard building. In order to keep file sizes manageable, the 
 * actions themselves are in [[actions.js]] in this folder; those could probably be 
 * split up eventually because we will have a lot of actions. 
 */
import React from 'react'; 
import { withFirebase } from '../Firebase'; 
import {Container} from "react-bootstrap"; 
import * as ROUTES from "../../constants/routes"; 
import {withRouter} from "react-router-dom"
import {compose} from "recompose"; 
import {AuthUserContext} from "../Session"; 
import {CreateGroupAction, DeleteGroupAction, CreateJoinRequestAction, TakeRequestAction, VerifyPendingUserAction, DashboardAction} from "./actions"; 
import * as entity from "../Firebase/entity"; 
/**
 * TODO: Build some dashboard here. Currently just loads all actions that I created so I coud test them 
 * - Raj 
 */
class Dashboard extends React.Component {
    constructor(props) {
        super(props); 
        this.authUser = props.authUser; 
        this.getDashboard = this.getDashboard.bind(this);
        this.getUnverifiedStub = this.getUnverifiedStub.bind(this);  
        this.state = {
            "user": {}
        }

    }
    componentDidMount() {
        this.props.firebase.user.get_user(this.authUser.uid).then((user) => {
            this.setState({"user": user}); 
        }); 
    }

    getDashboard() {
        return (
            <div>
            <CreateGroupAction firebase={this.props.firebase} authUser={this.authUser}/> 
            <br/>
            <DeleteGroupAction firebase={this.props.firebase} authUser={this.authUser}/>
            <br/>
            <CreateJoinRequestAction firebase={this.props.firebase} authUser={this.authUser}/>
            <TakeRequestAction firebase={this.props.firebase} authUser={this.authUser}/>
            <VerifyPendingUserAction firebase={this.props.firebase} authUser={this.authUser}></VerifyPendingUserAction>
            </div>
        )
    }

    getUnverifiedStub(membership_status) {
        if (membership_status === entity.MembershipStatus.pending) {
            return "Your membership confirmation is pending. We'll verify it within a few days. Apologies for the delay!"; 
        }
        if (membership_status === entity.MembershipStatus.suspended) {
            return (<p> Your account has been suspended. Please contact support at <a href="mailto:datascience.gt@gmail.com">datascience.gt@gmail.com</a> for assistance.</p>)
        }
    }
    render() {
        return (
            <Container> 
                {this.state.user.membership_status === entity.MembershipStatus.pending || 
                    this.state.user.membership_status === entity.MembershipStatus.suspended ? this.getUnverifiedStub(this.state.user.membership_status) : this.getDashboard()}
            </Container>
        )
    }
}

const DashboardWithFirebase = compose(withRouter, withFirebase) (Dashboard); 

export default class DashboardPage extends React.Component{
    render() {
        return (
            <div className="dashboard">
                <Container> 
                    <AuthUserContext.Consumer>
                        {authUser => authUser? <DashboardWithFirebase authUser={authUser} />: "Loading..."}
                    </AuthUserContext.Consumer> 
                </Container>
            </div>
        )
    }
}

