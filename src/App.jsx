import React from 'react';
import './App.scss';
import { useLocation, useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import routes from './routes';
import PageWrapper from './components/PageWrapper/PageWrapper';
import AuthPage from './pages/AuthPage/AuthPage';

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

function App(props) {
  const {
    token = 'test',
  } = props || {};

  const isAuth = React.useMemo(() => !!token, [token]);

  const element = useRoutes(routes);
  console.log('element: ', element);
  const { pathname } = useLocation();

  return (
    <div className="App">
      <PageWrapper isAuth={isAuth}>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition }}
            exit={{ opacity: 0, transition: { ...transition, duration: 0.2 } }}
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
