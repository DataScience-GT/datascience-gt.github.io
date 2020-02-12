import React from 'react'; 
import {Table} from 'react-bootstrap';
import firebase from 'firebase';
import './XPAcquisitonHistoryTable.css';

export default class XPAcquisitonHistoryTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            xpHistory: []
        }
    }

    componentDidMount() {
        // this.retrieveUserXPHistory();
    }

    retrieveUserXPHistory = async () => {
        await firebase.auth().onAuthStateChanged((user) => {
            this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid()).then(res => {
                let xpHistory = res['xp_history'];
                xpHistory.forEach(async item => {
                    console.log(item);
                    let eventId = item['id'];
                    // let eventXP = item.xp;
                    await this.props.firebase.event.get_event(eventId).then(snapshot => {
                        let newXPHistory = this.state.xpHistory;
                        let eventData = snapshot.data();
                        console.log(eventData);
                        newXPHistory.push({
                            name: eventData['name'],
                            date: eventData.date,
                            hostName: eventData.owner,
                            xpAcquired: eventData.XP
                        });
                    })
                })
            });
        });
    }

    render() {
        let events = this.state.xpHistory.map(event =>
            <tr>
                <td>{event.name}</td>
                <td>{event.date}</td>
                <td>{event.hostName}</td>
                <td>{event.xpAcquired}</td>
            </tr>
        );

        return (
            <Table striped bordered hover className="xp-table">
                <thead>
                    <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Host Name</th>
                    <th>XP Acquired</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kickoff</td>
                        <td>08-28-19</td>
                        <td>Neeraj</td>
                        <td>80</td>
                    </tr>
                    {events}
                </tbody>
            </Table>
        )
    }
}
