import React from 'react';
import {Button, Card, Modal, Form} from 'react-bootstrap';
import DashboardAlert from '../../../Member Dashboard/Dashboard Alert/DashboardAlert';
import EventTypeBadge from '../Event Type Badge/EventTypeBadge';
import EventXPBadge from '../Event XP Badge/EventXPBadge';
import EventEditForm from '../Event Edit Form/EventEditForm';

import './EventCard.css';

/**
 * @author Vidhur Kumar
 */
export default class EventCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        // console.log(this.props.event.data.isOpen);
        // console.log(this.props.event.data.code);
        // console.log(this.props.event.data.attendee_list);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          username: '',
          code: -1000,
          showSuccessAlert: false,
          showFailureAlert: false,
        };

        this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
            // console.log(snapshot);
            this.setState({username: snapshot['first_name'] + ' ' + snapshot['last_name']});
        });
        

    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleClick = async () => {
    }

    handleEventSignin = async () => {

    }

    handleInputChange = (event) => {
        // console.log(event.target.value);
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = async (id, name, desc, XP, date, type) => {
        await this.props.firebase.event.update_event(id, name, desc, XP, date, type);
        await this.handleClose();
        document.location.reload(true);
    }

    handleDelete = async (id) => {
        await this.props.firebase.event.delete_event(id);
        await this.handleClose();
        document.location.reload(true);
    }

    handleOpenEvent = async (id) => {
        await this.props.firebase.event.open_event(id);
        await this.handleClose();
        document.location.reload(true);
    }

    handleSignin = async (id) => {
        if(parseInt(this.state.code) === parseInt(this.props.event.data.code)) {
            let uid = this.props.firebase.user.get_current_uid();
            await this.props.firebase.event.add_to_event_attendee_list(id, this.state.username);
            await this.props.firebase.user.add_eventXP_to_user(uid, this.props.event.id, parseInt(this.props.event.data.XP));
            await this.setState({
                showSuccessAlert: true
            })
            // await this.handleClose();
        } else {
            await this.setState({
                showFailureAlert: true
            })
        }
    }

    handleSuccessAlertClose = async () => {
        console.log('here');
        await this.setState({
            showSuccessAlert: false
        });
        document.location.reload(true);
    }

    handleFailureAlertClose = async () => {
        console.log('here');
        await this.setState({
            showFailureAlert: false
        });
        document.location.reload(true);
    }
      
      render() {
        // console.log(this.state.username);
        // console.log(this.props.event.data.attendee_list.includes(this.state.username));
        const isEventOwnerContext = this.state.username === this.props.event.data.owner;
        const modalTitle = this.props.isRSVP ? 'Event Description' : 'Edit Event'
        const modalBody = this.props.isRSVP ? this.props.event.data.desc :
            <EventEditForm handleSubmit={this.handleSubmit.bind(this)} handleDelete={this.handleDelete.bind(this)} handleOpenEvent={this.handleOpenEvent.bind(this)} event={this.props.event} firebase={this.props.firebase}/>;
        const eventLinks = this.props.event.data.links && this.props.event.data.links.length > 0 ?
            <Button variant="outline-info" href={this.props.event.data.links[0]}>Files</Button> :
            null;
        return (
                <div>
                    <Card>
                        <Card.Body onClick={this.handleShow}>
                            <span><strong>{this.props.event.data.name}</strong></span>
                            <span className="event-type"><EventTypeBadge type={this.props.event.data.type}/></span>
                            <span className="event-type"><EventXPBadge XP={this.props.event.data.XP}/></span>
                        </Card.Body>
                    </Card>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <div>
                            <DashboardAlert variant="success" buttonText="Close" heading="Successfully signed into event!" show={this.state.showSuccessAlert} close={this.handleSuccessAlertClose}/>
                            <DashboardAlert variant="danger" buttonText="Close" heading="Incorrect event code" show={this.state.showFailureAlert} close={this.handleFailureAlertClose}/>
                        </div>
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {isEventOwnerContext && <div><strong>Event Code: {this.props.event.data.code}</strong></div>}
                            {modalBody}
                            <br />
                            {eventLinks}
                        </Modal.Body>
                        {this.props.isRSVP &&
                            <Modal.Footer>
                                <Form>
                                <Form.Group>
                                    <Form.Label>Event Code</Form.Label>
                                    <Form.Control onChange={this.handleInputChange} name="code"></Form.Control>
                                    <Button disabled={!this.props.event.data.isOpen || this.props.event.data.attendee_list.includes(this.state.username)} onClick={() => this.handleSignin(this.props.event.id)} className="rsvp-button" variant="outline-success">Sign in</Button>
                                </Form.Group>
                                </Form>
                            </Modal.Footer>
                        }
                    </Modal>
                </div>
          )
      }
}
