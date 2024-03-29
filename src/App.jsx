import React from 'react';
import './App.scss';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import routes from './routes/routes';
import PrivateRoutes from './routes/privateRoutes';
import PageWrapper from './components/PageWrapper/PageWrapper';
// import AuthPage from './containers/AuthPage/AuthPage';

const App = (/* props */) =>
// const { token } = props || {};

  (
    <div className="App">
      {/* <PageWrapper isAuth={true}> */}
      <PageWrapper isAuth>
        <AnimatePresence>
          <Switch>
            <Route
              exact
              path="/"
              /* render={() => (
                token ? <Redirect to="/zone" /> : <Redirect to="/sign-in" />
              )} */
              render={() => <Redirect to="/briefcases" />}
            />
            {/*            <Route
              exact
              path="/sign-in"
              render={() => (
                token ? <Redirect to="/zone" /> : <AuthPage />
              )}
            /> */}
            {routes.map(({
              path, exact, component: C, ...rest
            }) => (
              <PrivateRoutes
                /* isLoggedIn={!!token} */
                isLoggedIn
                key={path}
                path={path}
                exact={exact}
                component={<C {...rest} />}
              />
            ))}
            <Route render={() => (<Redirect to="/" />)} />
          </Switch>
        </AnimatePresence>
      </PageWrapper>
    </div>
  );
const mapStateToProps = (state) => ({
  token: state.tokenStore.token,
});

export default connect(mapStateToProps, null)(App);
