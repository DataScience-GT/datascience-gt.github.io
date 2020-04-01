import React from 'react'; 
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import * as ROUTES from '../../../../config/routes';
import firebase from 'firebase';
import './DashboardNavbar.css';

/**
 * @author Vidhur Kumar
 */
export default class DashboardNavbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isExec: false
        }
    }


    componentDidMount() {
        this.populateUser();
    }

    async populateUser() {
        await firebase.auth().onAuthStateChanged((user) => {
            this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid()).then(snapshot => {
                if(snapshot['groups'].includes('Exec')) {
                    this.setState({isExec: true});
                }
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar className="dashboard-navbar" collapseOnSelect expand="lg" variant="dark">
                    {/* <Navbar.Brand href="#home">Dashboard</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link name="home" href={ROUTES.DASHBOARD_HOME}>Home</Nav.Link>
                            <Nav.Link name="edit" href={ROUTES.DASHBORD_EDIT_PROFILE}>Edit Profile</Nav.Link>
                            {this.state.isExec &&
                                <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">Events</Dropdown.Toggle>
                              
                                <Dropdown.Menu>
                                  <Dropdown.Item href={ROUTES.DASHBOARD_EVENT + "/create"}>Create</Dropdown.Item>
                                  <Dropdown.Item href={ROUTES.DASHBOARD_EVENT + "/all"}>All Events</Dropdown.Item>
                                  <Dropdown.Item href={ROUTES.DASHBOARD_EVENT}>My Events</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                                // <Nav.Link name="event" href={ROUTES.DASHBOARD_EVENT}>Edit Events</Nav.Link>
                            }
                            {this.state.isExec &&
                                <Nav.Link name="group" href={ROUTES.DASHBOARD_GROUP}>Edit Groups</Nav.Link>                        
                            }
                        </Nav>
                        <Nav>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}
