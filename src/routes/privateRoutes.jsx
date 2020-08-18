import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivateRoute = ({ isLoggedIn, component, ...props }) => (
  <Route
    {...props}
    render={() => (
      isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {component}
        </motion.div>
      ) : <Redirect to="/" />
    )}
  />
);

export default PrivateRoute;
