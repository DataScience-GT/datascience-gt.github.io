import React from 'react'; 
import {ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from 'recharts';

/**
 * @author Vidhur Kumar
 */
export default class XPGrowthChart extends React.Component {
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
            <ResponsiveContainer width="100%" height={300}>
            <LineChart width={730} height={250} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="xp" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
        )
    }
}