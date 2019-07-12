import React from 'react'; 
import {Link} from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import * as ROUTES from "../../config/routes"
import {AuthUserContext, withAuthentication} from "../Session"; 
import {withRouter} from "react-router-dom"; 
import './index.css';

/**
 * Login button on the Navbar that gets conditionally rendered.
 */
class LoginComponent extends React.Component {
    constructor(props) {
        super(props); 
        this.SignOut = this.SignOut.bind(this); 
    }

    SignOut(event) {
        event.preventDefault(); 
        this.props.firebase.user.signout().then(() => {
            this.props.history.push("/"); 
        }); 
    }

    render() {
        console.log(this.context);
        if (this.context) {
        return (
            <Nav.Link href="" onClick={this.SignOut}>Sign Out</Nav.Link>
           )
        }
        else {
            return (<Nav.Link href={ROUTES.LOGIN}>Login</Nav.Link>)
        }
    }
}

/**
 * Sign up button on the Navbar that also gets conditionally rendered.
 */
class SignupComponent extends React.Component {
    render() {
        if(this.context) {
            return null;
        } else {
            return (
                <Nav.Link href={ROUTES.SIGNUP}>Sign Up</Nav.Link>
            )
        }
    }
}


LoginComponent.contextType = AuthUserContext; 
let AuthLoginComponent = withRouter(withAuthentication(LoginComponent)); 

SignupComponent.contextType = AuthUserContext;
let AuthSignUpComponent = withRouter(withAuthentication(SignupComponent));

export default class Navigation extends React.Component {
    constructor(props, authUser) {
        super(props); 
    }
    render() {
        return (
            <div className="padded">
                <Navbar sticky ="top" bg="dark" variant="dark" expand="md">
                    <Navbar.Brand><Link to='/'>DSGT</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link href={ROUTES.LANDING +"#about"}>About</Nav.Link>
                            {/* <Nav.Link href={ROUTES.LANDING + "#projects"}>Projects</Nav.Link> */}
                            <Nav.Link href={ROUTES.LANDING + "#events"}>Events</Nav.Link>
                            <Nav.Link href={ROUTES.LANDING + "#join"}>Join</Nav.Link>
                            <Nav.Link href={ROUTES.LANDING + "#resources"}>Resources</Nav.Link>
                            <Nav.Link href={ROUTES.LANDING + "#contact"}>Contact</Nav.Link>
                        </Nav>
                        <Nav>
                            <AuthLoginComponent /> 
                            <AuthSignUpComponent />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}



