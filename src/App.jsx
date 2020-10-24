import React from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import routes from './routes';
import PageWrapper from './components/PageWrapper/PageWrapper';
import AuthPage from './containers/AuthPage/AuthPage';

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

function App(props) {
  const {
    token = 'test',
  } = props || {};

  const isAuth = React.useMemo(() => !!token, [token]);

  const element = useRoutes(routes);

  return (
    <div className="App">
      <PageWrapper isAuth={isAuth}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition }}
            exit={{ opacity: 0, transition: { duration: 1.5, ...transition } }}
            transition={transition}
          >
            {isAuth ? element : <AuthPage />}
          </motion.div>
        </AnimatePresence>
      </PageWrapper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.tokenStore.token,
});

export default connect(mapStateToProps, null)(App);
