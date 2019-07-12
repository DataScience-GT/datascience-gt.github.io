import React from 'react'; 

/**
 * @author Vidhur Kumar
 */
export default class UserWelcomeHeader extends React.Component {
    static descriptor = "User Welcome";
    render() {
        return (
            <h1><strong>Welcome {this.props.user.first_name}!</strong></h1>
        )
    }
}