import React from 'react'; 
import {Row, Col} from "react-bootstrap"; 
import UserWelcomeHeader from '../../Member Dashboard/User Welcome Header/UserWelcomeHeader';
import {EventList} from '../../Member Dashboard/Event/Event';
import XPCard from '../../Member Dashboard/XP Card/XPCard';

/**
 * @author Vidhur Kumar
 */
export default class DashboardHomePage extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col><UserWelcomeHeader user={this.props.user}/></Col>
                </Row>
                <Row>
                    <Col xs="6"><XPCard XP={this.props.user.XP}></XPCard></Col>
                    <Col xs="6">
                        <h2>Upcoming Events</h2>
                        <EventList firebase={this.props.firebase}  isRSVP={true}/>
                    </Col>
                </Row>
            </div>
        )
    }
}