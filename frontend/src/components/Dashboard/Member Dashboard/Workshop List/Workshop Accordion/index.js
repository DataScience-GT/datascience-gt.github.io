import React from 'react'; 
import { Button, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import SemesterWorkshopTable from './Semester Workshop Table';
import * as WORKSHOP_CONSTANTS from '../../../../../config/workshops/config';

/**
 * @author Vidhur Kumar
 */
export default class WorkshopAccordion extends React.Component {

    render() {
        return (
            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="info" eventKey="0">Spring 2020</Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <SemesterWorkshopTable workshops={WORKSHOP_CONSTANTS.SPRING2020_WORKSHOPS_DATA}/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                    <Accordion.Toggle as={Button} variant="info" eventKey="1">Fall 2020</Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <SemesterWorkshopTable workshops={WORKSHOP_CONSTANTS.SPRING2020_WORKSHOPS_DATA}/>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
    }
}