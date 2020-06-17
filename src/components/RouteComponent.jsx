import { Switch, Route, Redirect } from 'react-router-dom';
import React from "react";

import CreateUser from './Pages/CreateUser';
import EditUser from './Pages/EditUser';
import Home from './Pages/Home';
import Page from './Page/Page';
import SimplePage from './Pages/SimplePage';
import ViewUser from './Pages/ViewUser';


function RouteComponent(props) {

  return (

      <Switch>
        <Route
          path="/create-user"
          render={props => (
            <Page {...props} component={CreateUser} title="Create User" />
          )}
        />
        <Route
          exact
          path="/user/:id"
          render={props => (
            <Page {...props} component={ViewUser} title="View User" />
          )}
        />
        <Route
          exact
          path="/user/:id/edit"
          render={props => (
            <Page {...props} component={EditUser} title="Edit User" />
          )}
        />
        <Route
          path="/simple-page"
          render={props => (
            <Page {...props} component={SimplePage} title="Simple Page" />
          )}
        />
        <Route
          exact
          path="/"
          render={props => (
            <Page {...props} component={Home} title="Home Page" />
          )}
        />
        <Redirect from='/' to='/'/>
      </Switch>

  );
}

export default RouteComponent;
