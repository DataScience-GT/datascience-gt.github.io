import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';

export default class MenuBar extends React.Component {
    

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
                    <Nav.Link><Link to='/login'>Log in</Link></Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}