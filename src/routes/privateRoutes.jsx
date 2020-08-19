import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

const PrivateRoute = ({ isLoggedIn, component, ...props }) => (
  <Route
    {...props}
    render={() => (
      isLoggedIn ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition }}
          exit={{ opacity: 0, transition: { duration: 1.5, ...transition } }}
          transition={transition}
        >
          {component}
        </motion.div>
      ) : <Redirect to="/" />
    )}
  />
);

export default PrivateRoute;
