import React from 'react'; 
import {Link} from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import * as ROUTES from "../../constants/routes"
import {AuthUserContext, withAuthentication} from "../Session"; 
import {withRouter} from "react-router-dom"; 
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
            <Nav.Link href="" onClick={this.SignOut}>Sign Out</Nav.Link>
           )
        }
        else {
            return (<Nav.Link href={ROUTES.LOGIN}>Login</Nav.Link>)
        }
    }
}
LoginComponent.contextType = AuthUserContext; 
let AuthLoginComponent = withRouter(withAuthentication(LoginComponent)); 

export default class Navigation extends React.Component {
    constructor(props, authUser) {
        super(props); 
        console.log(authUser); 
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md">
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
                       
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}



