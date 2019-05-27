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
import {CreateGroupAction, DeleteGroupAction, CreateJoinRequestAction, TakeRequestAction, VerifyPendingUserAction} from "./actions"; 

/**
 * TODO: Build some dashboard here. Currently just loads all actions that I created so I coud test them 
 * - Raj 
 */
class Dashboard extends React.Component {
    constructor(props) {
        super(props); 
        this.authUser = props.authUser; 
    }

    render() {
        return (
            <Container> 
                <CreateGroupAction firebase={this.props.firebase} authUser={this.authUser}/> 
                <br/>
                <DeleteGroupAction firebase={this.props.firebase} authUser={this.authUser}/>
                <br/>
                <CreateJoinRequestAction firebase={this.props.firebase} authUser={this.authUser}/>
                <TakeRequestAction firebase={this.props.firebase} authUser={this.authUser}/>
                <VerifyPendingUserAction firebase={this.props.firebase} authUser={this.authUser}></VerifyPendingUserAction>
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

