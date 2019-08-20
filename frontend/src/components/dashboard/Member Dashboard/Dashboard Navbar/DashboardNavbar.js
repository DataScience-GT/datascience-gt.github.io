import React from 'react'; 
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
                            <Nav.Link name="event" href={ROUTES.DASHBOARD_EVENT}>Edit Events</Nav.Link>
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