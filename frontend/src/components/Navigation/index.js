import React from 'react'; 
import { Link } from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import {Button} from 'react-bootstrap';
import * as ROUTES from "../../config/routes"
import {AuthUserContext, withAuthentication} from "../Session"; 
import {withRouter} from "react-router-dom"; 
import {withFirebase} from '../Firebase';
import './Navigation.css';
import DSGTLogo from './icon.png';

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
        if (this.context) {
            return (
                <Button href="" onClick={this.SignOut} variant="outline-light">Sign Out</Button>
            )
        }
        else {
            return (
                <Button href={ROUTES.LOGIN} variant="outline-light">Login</Button>
            )
            // return (<Nav.Link >Login</Nav.Link>)
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
                <Button href={ROUTES.SIGNUP} variant="outline-light">Sign Up</Button>
            )
        }
    }
}


LoginComponent.contextType = AuthUserContext; 
let AuthLoginComponent = withRouter(withAuthentication(LoginComponent)); 

SignupComponent.contextType = AuthUserContext;
let AuthSignUpComponent = withRouter(withAuthentication(SignupComponent));

// class Navigation extends React.Component {
//     constructor(props, authUser) {
//         super(props); 
        
//     }
//     render() {
//         let isLoggedin = this.props.firebase.user.auth.currentUser;
//         return (
//             <div className="padded">
//                 <Navbar className="main-navbar" sticky="top" expand="md">
//                     <Navbar.Brand><Link to='/'><img src="/img/icon.png" alt="DSGT"/></Link></Navbar.Brand>
//                     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//                     <Navbar.Collapse>
//                         <Nav className="mr-auto links">
//                             <Nav.Link href={ROUTES.LANDING +"#about"}>About</Nav.Link>
//                             {/* <Nav.Link href={ROUTES.LANDING + "#projects"}>Projects</Nav.Link> */}
//                             <Nav.Link href={ROUTES.LANDING + "#projects"}>Projects</Nav.Link>
//                             <Nav.Link href={ROUTES.LANDING + "#meetings"}>Meetings</Nav.Link>
//                             <Nav.Link href={ROUTES.LANDING + "#join"}>Join</Nav.Link>
//                             <Nav.Link href={ROUTES.SPONSORS}>Sponsors</Nav.Link>
//                             <Nav.Link href={ROUTES.LANDING + "#resources"}>Resources</Nav.Link>
//                             <Nav.Link href={ROUTES.BLOG}>Blog</Nav.Link>                            
//                             <Nav.Link href={ROUTES.LANDING + "#contact"}>Contact</Nav.Link>
//                         </Nav>
//                         <Nav>
//                             {isLoggedin && 
//                                     <Button className="dsgt-button" variant="primary" href={ROUTES.DASHBOARD_HOME}>Go To Dashboard</Button>
//                             }
//                             <AuthLoginComponent /> 
//                             <AuthSignUpComponent />
//                         </Nav>
//                     </Navbar.Collapse>
//                 </Navbar>
//             </div>
//         )
//     }
// }

class Navigation extends React.Component {

    render() {    
        let isLoggedin = this.props.firebase.user.auth.currentUser;
        return (
            <div className="main">
                {console.log(isLoggedin)}
                <Navbar sticky="top" expand="md">
                <Navbar.Brand href={ROUTES.LANDING}>
                <img
                    src={DSGTLogo}
                    width="35"
                    height="35"
                    alt="DSGT icon"
                />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav.Link href={ROUTES.OUR_TEAM} className="links">Our Team</Nav.Link>
                    <Nav.Link href={ROUTES.OUR_WORK} className="links">Our Work</Nav.Link>
                    <Nav.Link href={ROUTES.PROJECTS} className="links">Projects</Nav.Link>
                    <Nav.Link href={ROUTES.SPONSORS} className="links">Sponsors</Nav.Link>
                    <Nav.Link href={ROUTES.CONTACT} className="links">Contact</Nav.Link>
                    {/*<Nav.Link eventKey="/faqs" className="links">FAQs</Nav.Link>*/}
                </Navbar.Collapse>
                <div>
                    {isLoggedin && 
                        <Button className="dsgt-button" variant="outline-light" href={ROUTES.DASHBOARD_HOME}>Go To Dashboard</Button>
                    }                    
                    <AuthLoginComponent />
                    <AuthSignUpComponent />
                </div>
                </Navbar>
            </div>
        )

    }
}

export default withFirebase(Navigation);



