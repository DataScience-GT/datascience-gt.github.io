import React from 'react'; 

export default class DashboardEditProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <h2>EDIT PROFILE!</h2>
        )
    }
}