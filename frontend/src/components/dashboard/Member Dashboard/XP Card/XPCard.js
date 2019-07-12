import React from 'react'; 
import {Card, Badge} from 'react-bootstrap';
import {} from 'recharts';
import XPGrowthChart from './XPGrowthChart';

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
                            <h1><Badge variant="info">Your XP: {this.props.XP}</Badge></h1>
                        </Card.Text>
                        <XPGrowthChart/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}