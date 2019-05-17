import React from 'react'; 
import {Link} from 'react-router-dom'; 
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import * as ROUTES from "../../constants/routes"
import {AuthUserContext} from "../Session"; 

export default class Navigation extends React.Component {
    constructor(props, authUser) {
        super(props); 
        console.log(authUser); 
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand><Link to='/'>DSGT</Link></Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="">About</Nav.Link>
                    <Nav.Link href="#features">Projects</Nav.Link>
                    <Nav.Link href="#pricing">Calendar</Nav.Link>
                </Nav>
                <Nav>
                    <AuthUserContext.Consumer>
                        {authUser => authUser ? <p>Sign Out</p> : <Nav.Link href={ROUTES.LOGIN}>Log in</Nav.Link>}
                    </AuthUserContext.Consumer>
                </Nav>
            </Navbar>
        )
    }
}

