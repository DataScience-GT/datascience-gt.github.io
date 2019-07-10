import React from 'react'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
export default class DashboardNavbar extends React.Component {

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="secondary" variant="dark">
                    <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="#features">Home</Nav.Link>
                        <Nav.Link href="#pricing">Edit Profile</Nav.Link>
                        </Nav>
                        <Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}