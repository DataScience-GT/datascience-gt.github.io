import React from 'react'; 
import { AuthUserContext, withAuthentication } from '../../../Session';
import {withRouter} from 'react-router-dom'; 
import { FirebaseContext } from '../../../Firebase';
import DashboardNavbar from '../../Member Dashboard/Dashboard Navbar';
import WorkshopListHeader from '../../Member Dashboard/Workshop List/Workshop List Header';
import WorkshopAccordion from '../../Member Dashboard/Workshop List/Workshop Accordion';

/**
 * @author Vidhur Kumar
 */
export class DashboardWorkshopsContainer extends React.Component {

    render() {
        return (
            <div>
                <WorkshopListHeader />
                <WorkshopAccordion />
            </div>
        )
    }
}

DashboardWorkshopsContainer.contextType = AuthUserContext;
const DashboardWorkshopsContainerWithFirebase = withRouter(withAuthentication(DashboardWorkshopsContainer));

/**
 * @author Vidhur Kumar
 */
export default class DashboardWorkshopsPage extends React.Component {
    render() {
        return (
            <FirebaseContext.Consumer>
            {firebase => {
                return (
                    <div>
                        <DashboardNavbar firebase={firebase}/>
                        <DashboardWorkshopsContainerWithFirebase />
                    </div>
                )

            }}
            </FirebaseContext.Consumer>
        )
    }
}