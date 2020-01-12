import React from 'react';
import { Button } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert'

export default class DashboardAlert extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Alert show={this.props.show} variant={this.props.variant}>
                <Alert.Heading>{this.props.heading}</Alert.Heading>
                {/* <p>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                fermentum.
                </p> */}
                <hr />
                <div className="d-flex justify-content-end">
            <Button onClick={this.props.close} variant={"outline-" + this.props.variant}>{this.props.buttonText}</Button>
                </div>
            </Alert>
        )
    }
}
