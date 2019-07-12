import React from 'react'; 
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts';

export default class XPGrowthChart extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

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
            <LineChart width={730} height={250} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="xp" stroke="#8884d8" />
            </LineChart>
        )
    }
}