---
id: routing
title: React Router Integration
sidebar_label: React Router Integration
---
[React Router](https://reacttraining.com/react-router/) is a set of navigational components that can be composed with any React application. We chose to use this for the convenience of having bookmarkable URLs within the portal (via the "history" prop). 

Declarative Routing in the application is done entirely in the App.js file, where each endpoint is paired with its corresponding component (for instance, '/login' with LoginPage). Note that the routes are all defined under the 'config/routes.js' file, which is then imported on demand. It allows us to maintain a single point of configuration that ensures that only a single string needs to be modified in order to be reflected within the entire application.

```
<Router>
    <Navigation/> 
    <Route exact path={ROUTES.LANDING} component={HomePage} />
    <Route path={ROUTES.SPONSORS} component={SponsorsPage} />
    <Route path={ROUTES.LOGIN} component={LoginPage} />
    <Route path={ROUTES.SIGNUP} component={SignUpPage} />
    <Route path={ROUTES.DASHBOARD_HOME} component={Dashboard} />
    <Route path={ROUTES.DASHBORD_EDIT_PROFILE} component={DashboardEditProfilePage}/>
    <Route path={ROUTES.DASHBOARD_EVENT} component={DashboardEventPage}/>                
    <Route path={ROUTES.DASHBOARD_GROUP} component={DashboardGroupPage} />
</Router> 
```

This is currently what ```App.js``` is comprised of. Notice that we include the Navigation component (which will be visited later) within the parent component to avoid redundancy in declaring it. 

### Adding a new route
Assume that we want a new Dashboard Workshops Page in the portal.

1. We start by defining the route in the ```routes.js``` file:
```
export const DASHBOARD_WORKSHOPS = '/dashboard/workshops';
```

2. Import the desired component into the ```App.js``` file:

```
import DashboardWorkshopsPage from '../Dashboard/Common/Workshops Page';
```

3. Finally, we add a new ```<Route />``` component in the ```App.js``` file:
```
<Route path={ROUTES.DASHBOARD_WORKSHOPS} component={DashboardWorkshopsPage} />
```
