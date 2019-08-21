import React from 'react'; 
import EventCard from './Event Card/EventCard';

import './EventList.css';

/**
 * @author Vidhur Kumar
 */
export default class EventList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: []
        }

        // Pull the list of events from Firebase.
        this.props.firebase.event.get_events().then(snapshot => {
            let events = this.state.events;
            snapshot.forEach(doc => {
                if(new Date(doc.data()['date']) > new Date()) {
                    events.push({id: doc.id, data: doc.data()});
                }
            });
            events.sort((a, b) => {
                return new Date(a.data.date) - new Date(b.data.date);
            });
            this.setState({events: events});
        }).catch(err => {
            console.log('Error getting documents', err);
        });
    }

    render() {
        const eventItems = this.state.events.map(event => <EventCard key={event.data.name} event={event} isRSVP={this.props.isRSVP} firebase={this.props.firebase}/>);
        return (
            <div>
                {eventItems}
            </div>
        )
    }
}