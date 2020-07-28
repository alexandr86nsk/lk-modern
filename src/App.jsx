import React from 'react';
import './App.scss';
import './static/css/default.scss';
// import './static/css/global.scss';
import './static/css/typography.scss';
import '../semantic-ui/semantic.less';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from './routes/routes';
import PrivateRoutes from './routes/privateRoutes';
import PageWrapper from './components/PageWrapper/PageWrapper';
import actions from './redux/actions/actions';


const App = (props) => {
  const {
    referencesStoreGetAll,
    referencesStoreGetAllCancel,
  } = props;

  React.useEffect(() => {
    referencesStoreGetAll();
  }, [referencesStoreGetAll]);

  React.useEffect(() => () => {
    referencesStoreGetAllCancel();
  }, [referencesStoreGetAllCancel]);

  return (
    <div className="App font-type-m-12">
      <PageWrapper isAuth>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/briefcase" />
            )}
          />
          {routes.map(({
            path, exact, component: C, ...rest
          }) => (
            <PrivateRoutes
              isLoggedIn
              key={path}
              path={path}
              exact={exact}
              component={<C {...rest} />}
            />
          ))}
          <Route render={() => (<Redirect to="/" />)} />
        </Switch>
      </PageWrapper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.tokenStore.token,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(App);
