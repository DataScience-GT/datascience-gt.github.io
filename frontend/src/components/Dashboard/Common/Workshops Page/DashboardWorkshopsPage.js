import React from 'react'; 
import DashboardNavbar from '../../Member Dashboard/Dashboard Navbar/DashboardNavbar';
import WorkshopList from '../../Member Dashboard/Workshop List/WorkshopList'
import {withRouter} from 'react-router-dom'; 
import { withAuthentication } from '../../../Session';
import { FirebaseContext } from '../../../Firebase';
import { Container } from 'react-bootstrap';

export class DashboardWorkshopsContainer extends React.Component {

    render() {
        return (
            <Container>
                <WorkshopList />
            </Container>
        )
    }
}

const DashboardWorkshopsPageWithFirebase = withRouter(withAuthentication(DashboardWorkshopsContainer));

export default class DashboardWorkshopsPage extends React.Component {

    render() {
        return (
            <FirebaseContext.Consumer>
                {firebase => {
                    return (
                        <div>
                            <DashboardNavbar firebase={firebase}/>
                            <DashboardWorkshopsPageWithFirebase />
                        </div>
                    )

                }}
            </FirebaseContext.Consumer>
        )
    }
}