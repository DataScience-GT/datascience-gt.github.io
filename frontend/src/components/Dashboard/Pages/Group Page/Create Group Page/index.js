import React from 'react';
import {Button, Form, Table, Container, ListGroup } from "react-bootstrap"; 
import { AuthUserContext, withAuthentication } from '../../../../Session';
import {withRouter} from 'react-router-dom'; 
import { FirebaseContext } from '../../../../Firebase';
import DashboardNavbar from '../../../Member Dashboard/Dashboard Navbar';


/**
 * Action to create a group. This internally uses the 
 * [[../Firebase/groups]] API to create a group. Upon creation of a group, 
 * two things happen: 
 * 1. The group is added to the `/usergroups/` collection as a document. The 
 * group document looks like: 
 * ```json 
 * { 
 *  "name": "group_name", 
 *  "members": [], 
 *  "join_requests": []
 * }
 * ``` 
 * `members` is really a firebase collection. Each document in the members 
 * collection is an empty document with the same UID as the user. 
 * the `join_requests` collection appears when there are join requests. 
 */
export class CreateGroupForm extends React.Component {
    static descriptor = "Create New Group"
    constructor(props) {
        super(props); 
        this.state = {
            name: "" 
        }; 
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleInputChange(event) {
        this.setState({name: event.target.value}); 
    }

    /**
     * A simple wrapper that interally just calls create_group with the name. 
     * @param event The triggering JS event 
     */
    handleSubmit(event) {
        event.preventDefault(); 
        const name = this.state.name; 
        this.props.firebase.group.create_group(name); 
    }
    
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>New Group Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        )
    }
}

export class DashboardCreateGroupContainer extends React.Component {

    render() {
        return (
            <Container>
                <CreateGroupForm firebase={this.props.firebase} authUser={this.authUser}/> 
            </Container>
        )
    }
}

DashboardCreateGroupContainer.contextType = AuthUserContext;
const DashboardCreateGroupContainerWithFirebase = withRouter(withAuthentication(DashboardCreateGroupContainer));

export default class DashboardCreateGroupPage extends React.Component {
    render() {
        return (
            <FirebaseContext.Consumer>
            {firebase => {
                return (
                    <div>
                        <DashboardNavbar firebase={firebase}/>
                        <DashboardCreateGroupContainerWithFirebase />
                    </div>
                )

            }}
            </FirebaseContext.Consumer>
        )
    }
}