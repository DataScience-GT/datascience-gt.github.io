import React from 'react'; 
import {Button, Modal} from 'react-bootstrap';

/**
 * @author Vidhur Kumar
 */
export default class EventRSVPModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Description:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.event.data.desc}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.rsvp(this.props.event.id)} className="rsvp-button" variant="outline-success">RSVP</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
