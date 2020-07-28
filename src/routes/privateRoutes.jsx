import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, component, ...props }) => (
  <Route
    {...props}
    render={() => (
      isLoggedIn ? component : <Redirect to="/" />
    )}
  />
);

export default PrivateRoute;
