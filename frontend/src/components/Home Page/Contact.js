
import React from 'react';
import {Row, Col, Button} from 'react-bootstrap'; 
import * as CONSTANTS from "../../config/config";

const ContactLink = (props) => {
    return (
        <a href={props.href} className="link-override contact-col" {...props}>{props.children}</a>
    )
}
export default function ContactCore(){ return (
        <React.Fragment>

            <Row>
                <Col className="text-center">
                    <Button href={CONSTANTS.SUBSCRIBE}>Subscribe to our Mailing List!</Button>
                    {/* <a href={CONSTANTS.SUBSCRIBE} className="btn link-override link-button" role="button">
                        Subscribe to our Mailing List!
                    </a> */}
                </Col>
            </Row>
            <Row>
                <Col sm={4} className="text-center">
                    <ContactLink href={CONSTANTS.FACEBOOK} target="_blank"><span className="fab fa-facebook "></span></ContactLink>
                </Col>
                <Col sm={4} className="text-center">
                    <ContactLink href={CONSTANTS.LINKEDIN}><span className="fab fa-linkedin"></span></ContactLink>
                </Col>
                <Col sm={4} className="text-center">
                    <ContactLink href={CONSTANTS.EMAIL_URL}><span className="fas fa-envelope"></span></ContactLink>
                </Col>
            </Row>
            </React.Fragment>
    
)}