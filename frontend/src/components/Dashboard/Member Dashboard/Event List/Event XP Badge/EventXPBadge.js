import React from 'react';
import {Badge} from 'react-bootstrap';

export default class EventXPBadge extends React.Component {

    render() {
        return (
            <Badge pill variant="info">XP: {this.props.XP}</Badge>
        )
    }
}
