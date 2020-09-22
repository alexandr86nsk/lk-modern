import React from 'react';
import './AuthPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import ErrorsBlock from './ErrorsBlock';
import UILoader from '../../components/UILoader/UILoader';
import UIInput from '../../components/UIInput/UIInput';
import logo from '../../static/images/logo.png';
import UILogo from '../../components/UILogo/UILogo';

function AuthPage(props) {
  const {
    login,
    password,
    tryLogIn,
    authStoreSetSection,
    authStoreLogIn,
    authStoreClear,
  } = props || {};

  const inputEl = React.useRef(null);

  React.useEffect(() => () => {
    authStoreClear();
  }, [authStoreClear]);

  const handleLogIn = React.useCallback(() => {
    authStoreLogIn({ login, password });
  }, [login, password, authStoreLogIn]);

  const handleChangeValue = React.useCallback((editName, editValue) => {
    authStoreSetSection({
      errors: null,
      [editName]: editValue,
    });
  }, [authStoreSetSection]);

  React.useEffect(() => {
    function handlePressEnter(event) {
      const { current } = inputEl || {};
      if (event.keyCode === 13
        && login
        && password
        && current
        && current.contains(event.target)
      ) {
        authStoreLogIn({ login, password });
      }
    }
    document.addEventListener('keyup', handlePressEnter);
    return () => {
      document.removeEventListener('keyup', handlePressEnter);
    };
  }, [authStoreLogIn, login, password]);

  return (
    <div className="auth-page">
      <section className="auth-page__banner">
        <div className="auth-page__form form">
          <div className="form__body">
            {tryLogIn && (
            <div className="form__loader">
              <UILoader text="Выполняется авторизация" />
            </div>
            )}
            <div className="auth-page__logo">
              <UILogo type="--vertical" />
            </div>
            <div className="form__header">Авторизация</div>
            <div className="form__input-block" ref={inputEl}>
              <UIInput title="Телефон" name="login" callback={handleChangeValue} data={login} mask="00000000000" />
              <UIInput title="Пароль" name="password" password callback={handleChangeValue} data={password} />
            </div>
            <div className="form__btn-block">
              <Button
                primary
                fluid
                disabled={!login || !password}
                onClick={handleLogIn}
                title="Войти"
              >
                <Icon name="key" />
                Войти
              </Button>
            </div>
            <ErrorsBlock />
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  login: state.authStore.login,
  password: state.authStore.password,
  tryLogIn: state.authStore.tryLogIn,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);
