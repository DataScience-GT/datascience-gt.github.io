import React from 'react'; 
import {Button, Row, Col} from "react-bootstrap"; 
import UserWelcomeHeader from '../../Member Dashboard/User Welcome Header/UserWelcomeHeader';
import EventList from '../../Member Dashboard/Event List/EventList';
import XPCard from '../../Member Dashboard/XP Card/XPCard';

import './DashboardHomePage.css';

/**
 * @author Vidhur Kumar
 */
export default class DashboardHomePage extends React.Component {

    render() {
        return (
            <div className="home-page">
                <Row>
                    <Col><UserWelcomeHeader user={this.props.user}/></Col>
                </Row>
                <Row>
                    <Col xs="12" md="6"><XPCard XP={this.props.user.XP} firebase={this.props.firebase}></XPCard></Col>
                    <Col xs="12" md="6">
                        <h2>Upcoming Events</h2>
                        <span className="event-header">
                            <Button href="https://forms.gle/8fzb6fr8D9d8K4Cv7" variant="outline-primary">Event Excuse Form</Button>
                            <Button href="https://forms.gle/XgxDPPEKxA2hGTxS6" variant="outline-primary">Bonus XP</Button>
                        </span>
                        <EventList firebase={this.props.firebase} isRSVP={true}/>
                    </Col>
                </Row>
                <Row>
                    <Col className="event-forms">

                    </Col>
                </Row>
            </div>
        )
    }
}
