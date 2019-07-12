import React from 'react'; 
import {Card, Badge} from 'react-bootstrap';

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
                    </Card.Body>
                </Card>
            </div>
        )
    }
}