import React from 'react'; 
import * as entity from "../Firebase/entity"; 

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        let user = (props.firebase.user.get_user(props.authUser.uid));
    }
    render() {
        return <div><p></p></div>;
    }
}
