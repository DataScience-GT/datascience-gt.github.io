import React from 'react'; 
import { withFirebase } from '../Firebase'; 
import {Container} from "react-bootstrap"; 
import * as ROUTES from "../../constants/routes"; 
import {withRouter} from "react-router-dom"
import {compose} from "recompose"; 
import {AuthUserContext} from "../Session"; 


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

