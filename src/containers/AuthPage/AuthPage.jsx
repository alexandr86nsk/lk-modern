import React from 'react';
import './AuthPage.scss';
import { connect } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import actions from '../../redux/actions/actions';
import ErrorsBlock from './ErrorsBlock';
import UILoader from '../../components/UILoader/UILoader';
import UIInput from '../../components/UIInputV2/UIInput';

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
        <div className="banner__content">
          <h1>Мобильное приложение</h1>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 25 160 40" className="waves">
          <defs>
            <path
              id="wave"
              d="M-150 53c30.77 0 59.538-20 90-20 31.077 0 60.256 20 90 20 30.77 0 59.23-20 90-20 30.77 0 59.23 20 90 20v20h-360z"
            />
          </defs>
          <g>
            <use href="#wave" x="50" y="0" fill="#7986cb" />
            <use href="#wave" x="50" y="2" fill="#5c6bc0" />
            <use href="#wave" x="50" y="4" fill="#ffffff" />
          </g>
        </svg>
        <div className="auth-page__form">
          <div className="form__body">
            {tryLogIn && (
            <div className="form__loader">
              <UILoader text="Выполняется авторизация..." />
            </div>
            )}
            <div className="form__header">Авторизация</div>
            <div className="form__input-block" ref={inputEl}>
              <UIInput title="Телефон" name="login" callback={handleChangeValue} data={login} mask="00000000000" />
              <UIInput title="Пароль" name="password" password callback={handleChangeValue} data={password} />
            </div>
            <div className="form__btn-block">
              <Button
                positive
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
