import React from 'react'; 
import {Card, Badge} from 'react-bootstrap';
import {} from 'recharts';
// import XPGrowthChart from './XPGrowthChart';
import XPAcquisitionHistoryTable from './XP Acquisition Table/XPAcquisitionHistoryTable';
import './XPCard.css';

/**
 * @author Vidhur Kumar
 */
export default class XPCard extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <h1><Badge className="xp-badge">XP: {this.props.XP}</Badge></h1>
                        </Card.Text>
                        {/* <XPGrowthChart /> */}
                        <XPAcquisitionHistoryTable firebase={this.props.firebase}/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
