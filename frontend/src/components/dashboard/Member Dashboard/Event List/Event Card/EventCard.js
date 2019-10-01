import React from 'react';
import {Button, Card, Modal} from 'react-bootstrap';

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
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          username: ''
        };

        this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid())
        .then(snapshot => {
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

      handleRSVP = () => {
          this.props.firebase.event.rsvp_to_event(this.props.event.id, this.state.username);
          this.handleClose();
          this.props.event.data.rsvp_list.forEach(member => {
              let names = member.split(" ");
              let id = null;
              this.props.firebase.user.get_user_from_name(names[0], names[1]).then(snapshot => id = snapshot);
          })
      }
      
      render() {
        const modalTitle = this.props.isRSVP ? 'Event Description' : 'Edit Event'
        const modalBody = this.props.isRSVP ? this.props.event.data.desc :
            <EventEditForm handleSubmit={this.handleSubmit.bind(this)} handleDelete={this.handleDelete.bind(this)} event={this.props.event} firebase={this.props.firebase}/>;
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
                        <Modal.Header closeButton>
                            <Modal.Title>{modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {modalBody}
                            <br />
                            {eventLinks}
                        </Modal.Body>
                        {this.props.isRSVP &&
                            <Modal.Footer>
                                <Button disabled={this.props.event.data.rsvp_list.includes(this.state.username)} onClick={this.handleRSVP} className="rsvp-button" variant="outline-success">RSVP</Button>
                            </Modal.Footer>
                        }
                    </Modal>
                </div>
          )
      }
}