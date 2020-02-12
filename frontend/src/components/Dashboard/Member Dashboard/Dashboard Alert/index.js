import React from 'react';
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert'

/**
 * @author Vidhur Kumar
 */
export default class DashboardAlert extends React.Component {
    render() {
        return (
            <Alert show={this.props.show} variant={this.props.variant}>
                <Alert.Heading>{this.props.heading}</Alert.Heading>xs
                <hr />
                <div className="d-flex justify-content-end">
            <Button onClick={this.props.close} variant={"outline-" + this.props.variant}>{this.props.buttonText}</Button>
                </div>
            </Alert>
        )
    }
}
