import React from 'react'; 
import { Button, Form, Table, Container} from "react-bootstrap";

export class DashboardAction extends React.Component {
    constructor(props) {
        super(props)
        this.user = (this.props.firebase.user.get_user(props.authUser.uid));
    }
    render() {
        return;
    }
}

export class CreateGroupAction extends DashboardAction {
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

export class DeleteGroupAction extends DashboardAction {
    constructor(props) {
        super(props); 
        this.state = {
            name: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.setup_groups_available();
    }
    async setup_groups_available() {
        const availale_groups = await this.props.firebase.group.get_groups();
        this.groups_available = availale_groups.map(group => 
            <li>{group}</li>
        )

    }
    handleInputChange(event){
        this.setState({name: event.target.value}); 
    }

    handleSubmit(event) {
        event.preventDefault(); 
        const name = this.state.name; 
        this.props.firebase.group.delete_group(name); 
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <p>Available Groups: </p>
                <ul>{this.groups_available}</ul>
                <Form.Group>
                    <Form.Label>Delete Group Name</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Delete</Button>
            </Form>
        )
    }
}

export class CreateJoinRequestAction extends DashboardAction {
    constructor(props) {
        super(props) 
        this.state = {
            name: "", 
            reason: "", 
        }
        this.available_groups = []

        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.props.firebase.group.get_groups().then(groups => {
            this.available_groups = groups; 
            console.log(this.available_groups)
            this.forceUpdate()
        })
    }

    handleInputChange(event) {
        let target = event.target; 
        this.setState({[target.name]: target.value})
    }

    handleSubmit(event) {
        event.preventDefault(); 
        this.props.firebase.user.requestJoinGroup(this.state.name, this.state.reason); 
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group> 
                    <Form.Control as="select" onChange={this.handleInputChange} name="name"> 
                        <option>None Selected</option>
                        {this.available_groups.map(group => <option key={group} value={group}>{group}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Reason</Form.Label>
                    <Form.Control name="reason" as="textarea" rows='3' onChange={this.handleInputChange}></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Create Request</Button>
            </Form>
        )
    }
}

export class TakeRequestAction extends DashboardAction {
    constructor(props) {
        super(props) 
        this.state = {
            "selected": "", 
            "requests": []
        }; 
        this.available_groups = []
        this.reqs = [] 
        this.handleInputChange = this.handleInputChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.handleClick = this.handleClick.bind(this); 
        this.props.firebase.group.get_groups().then(groups => {
            this.available_groups = groups; 
            this.forceUpdate()
        })
    }

    handleInputChange(event) {
        let target = event.target; 
        this.setState({
            "selected": target.value
        }, this.handleUpdateRequests); 
    }

    handleUpdateRequests(force) {
        this.props.firebase.group.getPendingRequests(this.state.selected).then(req => {
            if (!force) {
                this.setState({"requests": req.docs.map(doc => doc.data())}); 
            } else {
                this.state.requests = req.docs.map(doc => doc.data()); 
                this.forceUpdate(); 
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault(); 
    }
    
    handleClick(event) {
        this.props.firebase.user.respondToJoinRequest(this.state.selected, event.target.value, 
            event.target.name === "approve" ? 1 : 0); 
        this.handleUpdateRequests(true); 
    }

    render() {
        return (
            <Container> 
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select Group for Requests</Form.Label>
                        <Form.Control onChange={this.handleInputChange} as="select" name="selected_option">
                            <option> None selected </option> 
                            {this.available_groups.map(group => <option key={group} value={group}>{group}</option>)}
                        </Form.Control>
                    </Form.Group>
                </Form>
                <Table> 
                    <tbody>

                    {this.state.requests.map(req => 
                        <tr key={req.user}>
                            <td>{req.first_name}</td>
                            <td>{req.last_name}</td>
                            <td>{req.reason}</td>
                            <td>
                                <Button variant="primary" name="approve" value={req.user} onClick={this.handleClick}>Approve</Button>
                                <Button variant="danger" name="deny" value={req.user} onClick={this.handleClick}>Deny</Button>
                            </td>
                        </tr>
                     )}
                    </tbody>
                </Table>
            </Container> 
        )
    }
}