import React from 'react'; 
import {Card, Badge} from 'react-bootstrap';
import {ResponsiveContainer} from 'recharts';
import XPGrowthChart from './XPGrowthChart';

/**
 * @author Vidhur Kumar
 */
export default class XPCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Body>
                        <Card.Text>
                            <h1><Badge variant="info">Your XP: {this.props.XP}</Badge></h1>
                        </Card.Text>
                        <ResponsiveContainer width="100%" height="70%">
                        <XPGrowthChart/>
                        </ResponsiveContainer>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}