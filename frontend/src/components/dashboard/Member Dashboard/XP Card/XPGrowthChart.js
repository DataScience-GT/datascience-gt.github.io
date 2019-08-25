import React from 'react'; 
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts';
import firebase from 'firebase';
import moment from 'moment';

/**
 * @author Vidhur Kumar
 */
export default class XPGrowthChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            xpHistory: []
        }
        // props.xpHistory.forEach(xp => {
        //     console.log(xp);
        // });
    }

    componentWillMount() {
        this.retrieveUserXPHistory();
    }

    retrieveUserXPHistory = async () => {
        await firebase.auth().onAuthStateChanged((user) => {
            this.props.firebase.user.get_user(this.props.firebase.user.get_current_uid()).then(res => {
                let xpHistory = res['xp_history'];
                let newXPHistory = this.state.xpHistory;
                xpHistory.forEach(async item => {
                    let eventId = item.id;
                    let eventXP = item.xp;
                    await this.props.firebase.event.get_event(eventId).then(snapshot => {
                        let eventData = snapshot.data();
                        newXPHistory.push({
                            // name: eventData.name,
                            date: eventData.date,
                            // hostName: eventData.owner,
                            XP: eventData.XP
                        });
                    });
                });
                this.setState({xpHistory: newXPHistory});
            });
        });
    }

    render() {
        // console.log(this.props.xpHistory);
        // const newData = [];
        // for(let event in this.state.xpHistory) {
        //     newData.push({
        //         "date": event.date,
        //         "xp": event.XP
        //     });
        // }
        // console.log(newData);
        const data = [
        {
            "date": "Aug 23",
            "xp": 10
        },

        {
            "date": "Sep 23",
            "xp": 15
        },

        {
            "date": "Oct 22",
            "xp": 35
        },

        {
            "date": "Nov 12",
            "xp": 75
        }
    ];
        return (
            <ResponsiveContainer width="100%" height={300}>
            <LineChart width={730} height={250} data={this.state.xpHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={timeStr => moment(timeStr).format("YYYY:MM:DD")} type="number" scale="time"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="xp" name="XP" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
        )
    }
}