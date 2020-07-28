import React from 'react';
import './AuthPage.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import ErrorsBlock from './ErrorsBlock';
import PhoneIcon from '../../static/images/phone.svg';
import UIButton from '../../components/UIButton/UIButton';
import { logIn, winAuth } from './pageLogic';
import UILoader from '../../components/UILoader/UILoader';
import UIInput from '../../components/UIInput/UIInput';


function AuthPage(props) {
  const {
    login,
    password,
    authStoreSetValue,
    authStoreSetErrors,
    setToken,
  } = props;

  const [pageLoading, setPageLoading] = React.useState(false);
  const [appLoading, setAppLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => winAuth(setAppLoading), 1000);
  }, []);

  const memoizedLogIn = React.useCallback(() => {
    logIn(login, password, setPageLoading, setToken, authStoreSetErrors);
  }, [login, password, setToken, authStoreSetErrors]);

  return (
    <div className={`auth-page font-type-m-16 ${appLoading ? 'loading' : ''}`}>
      <div className="auth-page__animation-block">
        <div className="auth-page__header">
          <div className="auth-page__logo">
            <PhoneIcon />
          </div>
          <div className="auth-page__title font-type-b-20">Asterisk Dialer</div>
        </div>
        <div className="auth-page__form">
          {pageLoading && <UILoader />}
          <div className="auth-page__input-block">
            <UIInput title="Логин" name="login" callback={authStoreSetValue} data={login} />
            <UIInput title="Пароль" name="password" password callback={authStoreSetValue} data={password} />
          </div>
          <div className="auth-page__log-in-block">
            <UIButton
              type="positive"
              disabled={!login || !password}
              title="Войти"
              callback={memoizedLogIn}
            />
          </div>
          <ErrorsBlock />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  login: state.authStore.login,
  password: state.authStore.password,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
