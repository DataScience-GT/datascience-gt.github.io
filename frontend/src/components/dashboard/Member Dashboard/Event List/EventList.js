import React from 'react'; 
import EventCard from './Event Card/EventCard';
import Spinner from 'react-bootstrap/Spinner'

import './EventList.css';

/**
 * @author Vidhur Kumar
 */
export default class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            events: []
        }

        // Pull the list of events from Firebase.
        this.props.firebase.event.get_events().then(snapshot => {
            let events = this.state.events;
            let yesterdaysDate = new Date();
            yesterdaysDate.setDate(yesterdaysDate.getDate() - 2);
            snapshot.forEach(doc => {
                if(new Date(doc.data()['date']) >= yesterdaysDate) {
                    events.push({id: doc.id, data: doc.data()});
                }
            });
            events.sort((a, b) => {
                return new Date(a.data.date) - new Date(b.data.date);
            });
            this.setState({events: events, isLoading: false});
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        const eventItems = this.state.events.map(event => <EventCard key={event.data.name} event={event} isRSVP={this.props.isRSVP} firebase={this.props.firebase}/>);
        return (
            this.state.isLoading ? <Spinner animation="border" size="xlg" /> :
            <div>
                {eventItems}
            </div>
        )
    }
}