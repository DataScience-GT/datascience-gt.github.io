import React from 'react';
import {Badge} from 'react-bootstrap';

/**
 * @author Vidhur Kumar
 */
export default class EventTypeBadge extends React.Component {
    /**
     * Maps the specified event type to the corresponding badge variant.
     */
    mapTypeToBadgeVariant = (type) => {
        switch(type) {
            case "General Meeting":
                return "primary";

            case "Workshop":
                return "warning";

            case "Special":
                return "danger";

            case "Project":
                return "success";

            default:
                return "secondary";
        }
    }

    mapTypeToBadgeText = (type) => {
        switch(type) {
            case "gm":
                return "General Meeting";

            case "workshop":
                return "Workshop";

            case "special":
                return "Special";

            case "project":
                return "Project";

            default:
                return "Unknown";
        }
    }

    render() {
        return (
            <h5><Badge pill variant={this.mapTypeToBadgeVariant(this.props.type)}>{this.props.type}</Badge></h5>
        );
    }
}
