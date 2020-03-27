---
id: auth
title: Authentication
sidebar_label: Authentication
---

Authentication is a significant part of the portal application as it allows us to maintain restricted access to sensitive functionality and member-only content. We use [Firebase Authentication](https://firebase.google.com/docs/auth) (specifically, a simple email-password function). Firebase ensures that we have no overhead in terms of maintaining a secure repository of user credentials as that comes with the package that they offer.

Now, the question remains: how do we incorporate an authentication requirement, i.e., the user has to be logged in into specific components. React has a concept called [higher order components](https://reactjs.org/docs/higher-order-components.html), which allows us to wrap a particular component within another component. This serves two purposes:
1. To reuse the component logic.
2. To connect to specific services (in our case, an auth service).

### The ```withAuthentication``` component

In the portal, the higher order component is called ```withAuthentication``` and it resides in ```components/Session/withAuthentication.js```. Note that there are two other files in ```components/Session```, and these only exist to declare an ```AuthUserContext``` (read more about context in React [here](https://reactjs.org/docs/context.html#when-to-use-context)). 

Within the logic of this component, we have the following:

1. A listener for a change in the Firebase Auth state, which allows us to know whether or not a user is logged in:

```
this.listener = this.props.firebase.user.auth.onAuthStateChanged(
    authUser => {
        authUser
        ? this.setState({authUser})
        : this.setState({authUser: null}); 
    },
    ); 
```

2. Wrapping the component that is passed in within the ```AuthUserContext```. 
```
<AuthUserContext.Provider value={this.state.authUser}>
    <Component {...this.props}/>

</AuthUserContext.Provider>
```

3. A call to ```withFirebase```, another higher order component that allows us to utilize Firebase services such as Auth and Cloud Firestore.
```
return withFirebase(withAuthentication);
```

