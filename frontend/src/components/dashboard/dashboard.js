import React from 'react'; 
import { withFirebase } from '../Firebase'; 
import {Container} from "react-bootstrap"; 
import * as ROUTES from "../../constants/routes"; 
import {withRouter} from "react-router-dom"
import {compose} from "recompose"; 
import {AuthUserContext} from "../Session"; 

class Dashboard extends React.Component {
    constructor(props, authUser) {
        super(props)
        console.log(authUser); 
    }

    render() {
        return <div><p></p></div>;
    }
}

const DashboardWithFirebase = compose(withRouter, withFirebase) (Dashboard); 

export default class DashboardPage extends React.Component{
    render() {
        return (
            <div className="dashboard">
                <Container> 
                    <AuthUserContext.Consumer>
                        {authUser => authUser? "Yes" : "No"}
                        {/* {authUser => <DashboardWithFirebase authUser={authUser}/>} */}
                    </AuthUserContext.Consumer> 
                </Container>
            </div>
        )
    }
}

