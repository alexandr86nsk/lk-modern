import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useShallowEqualSelector } from '@src/hooks';

import './styles.scss';

import { Button } from '@components/Button';
import { Divider } from '@components/Divider';
import { Field } from '@components/Form/components/Field/Field';

import { AuthFormProps } from '@pages/AuthPage/types';

import { authActions, authSelectors } from '@store/auth';

function AuthFormComponent({ onRegister }: AuthFormProps) {
  const dispatch = useDispatch();
  const login = useShallowEqualSelector(authSelectors.login);
  const password = useShallowEqualSelector(authSelectors.password);
  const tryAuthIndicator = useShallowEqualSelector(authSelectors.tryAuthIndicator);
  const errors = useShallowEqualSelector(authSelectors.errors);

  const logInHandler = useCallback(() => {
    if (login && password) {
      dispatch(authActions.getAuth({ login, password }));
    }
  }, [login, password, dispatch]);

  const onChangeInputHandler = useCallback(
    ({ name, value }) => {
      dispatch(authActions.setSection({ [name]: value }));
    },
    [dispatch]
  );

  return (
    <div className="auth-page__form">
      <h4 className="auth-page__title">Авторизация</h4>
      <Field
        value={login}
        icon="personOutline"
        theme="filled"
        name="login"
        title="Логин"
        onChange={onChangeInputHandler}
        isAutoComplete
      />
      <Field
        value={password}
        icon="lockOutline"
        theme="filled"
        name="password"
        type="password"
        title="Пароль"
        onChange={onChangeInputHandler}
        isAutoComplete
      />
      <Button
        className="auth-page__btn auth-page__btn_type_main"
        onClick={logInHandler}
        size="sm"
        isFluid
        hasRipple
        theme="primary"
        isLoading={tryAuthIndicator}
      >
        Войти
      </Button>
      <Button onClick={onRegister} size="xs" isGhost hasRipple isCompact isFluid theme="primary">
        Зарегистрироваться
      </Button>
      {errors && <span className="auth-page__errors">{errors}</span>}
      <Divider>ИЛИ</Divider>
      <Button
        icon="google"
        className="auth-page__btn auth-page__btn_type_google"
        size="sm"
        isFluid
        isOutline
        hasRipple
        theme="primary"
      >
        Войти через Google
      </Button>
    </div>
  );
}

export const AuthForm = memo(AuthFormComponent);
