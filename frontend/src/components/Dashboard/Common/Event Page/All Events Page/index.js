import React from 'react'; 
import { Button, Form, InputGroup, Container, Modal } from "react-bootstrap"; 
import Spinner from 'react-bootstrap/Spinner'
import {withRouter} from 'react-router-dom'; 
import DashboardNavbar from '../../../Member Dashboard/Dashboard Navbar';
import { withAuthentication } from '../../../../Session';
import { FirebaseContext } from '../../../../Firebase';
import EventList from '../../../Member Dashboard/Event List';

export class DashboardAllEventsContainer extends React.Component {

    render() {
        return (
            <Container>
                <h2>All Events</h2>
                <EventList firebase={this.props.firebase} upcomingOnly={false}/>
            </Container>
        )
    }
}

const DashboardAllEventsPageWithFirebase = withRouter(withAuthentication(DashboardAllEventsContainer));

export default class DashboardAllEventsPage extends React.Component {
    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => {
                    return (
                        <div>
                            <DashboardNavbar firebase={firebase}/>
                            <DashboardAllEventsPageWithFirebase />
                        </div>
                    )

                }}
            </FirebaseContext.Consumer>
        )
    }
}