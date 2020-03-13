import React from 'react'; 
import { Button, Card } from 'react-bootstrap';
import './WorkshopCard.css';

/**
 * @author Vidhur Kumar
 */
export default class WorkshopCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Card>
                <Card.Body>
                    <h5>{this.props.workshopName}</h5>
                </Card.Body>
            </Card>
        )
    }
}