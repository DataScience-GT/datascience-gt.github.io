import React from 'react'; 
import {Table} from 'react-bootstrap';

export default class XPAcquisitonHistoryTable extends React.Component {

    render() {
        return (
            <Table striped bordered hover variant="secondary">
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
                </tbody>
            </Table>
        )
    }
}
