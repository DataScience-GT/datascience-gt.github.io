/**
 * According to the tutorial I was following, this should allow us to pass 
 * a firebase context to each component, eliminating the need for 
 * multiple firebase instances and creating a singleton (which simplifies
 * login context.)
 */
import React from 'react'; 

const FirebaseContext = React.createContext(null); 

export const withFirebase = Component => props => (
    <FirebaseContext.Consumer> 
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext; 
