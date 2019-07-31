import React from 'react'; 
import AuthUserContext from "./context"; 
import { withFirebase } from "../Firebase"

/**
 * Magically supports authentication. I'm not sure 
 * how it works, I followed a tutorial and it somehow 
 * just worked. My best-guesses are embedded. 
 * 
 * @author Raj Shrimali
 */
const withAuthentication = Component => {
    class withAuthentication extends React.Component {
        constructor(props) {
            super(props); 
            // keep track of authenticated user. 
            this.state = {
                authUser: null
            }; 
        }
        //upon the creation of the component, we add a listener 
        // to the authneication state of firebase. 
        componentDidMount() {
            // the listener goes ahead and sets the authUser upon firebase authenicatino changes 
            this.listener = this.props.firebase.user.auth.onAuthStateChanged(
              authUser => {
                  authUser
                  ? this.setState({authUser})
                  : this.setState({authUser: null}); 
              },
            ); 
        }
    
        // upon removing the app, we call the listner. Not sure what this 
        // does, but it's supposed to prevent memory leaks
        componentWillUnmount() {
            this.listener(); 
        }
    
        // we render this, so the component that is called withAuthentication() has 
        // this as a super-context. The super-context provides the authUser, so 
        // the component inside can access it. 
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props}/>

                </AuthUserContext.Provider>
            )
        }
    }
    // the compoennt is rendered inside firebase. 
    // so everythign with authenication is automatically inside firebase. 
    return withFirebase(withAuthentication);
}

export default withAuthentication;
