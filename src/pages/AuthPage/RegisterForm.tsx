import React, { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useShallowEqualSelector } from '@src/hooks';

import './styles.scss';

import { Button } from '@components/Button';
import { Field } from '@components/Form/components/Field/Field';

import { RegisterFormProps } from '@pages/AuthPage/types';

import { authActions, authSelectors } from '@store/auth';

function RegisterFormComponent({ onClose }: RegisterFormProps) {
  const dispatch = useDispatch();
  const registerLogin = useShallowEqualSelector(authSelectors.registerLogin);
  const registerPassword = useShallowEqualSelector(authSelectors.registerPassword);
  const registerPasswordConfirm = useShallowEqualSelector(authSelectors.registerPasswordConfirm);
  const tryRegisterIndicator = useShallowEqualSelector(authSelectors.tryRegisterIndicator);
  const registerErrors = useShallowEqualSelector(authSelectors.registerErrors);

  const onRegisterHandler = useCallback(() => {
    if (registerLogin && registerPassword) {
      dispatch(authActions.getRegister({ login: registerLogin, password: registerPassword }));
    }
  }, [registerLogin, registerPassword, dispatch]);

  const onChangeInputHandler = useCallback(
    ({ name, value }) => {
      dispatch(authActions.setSection({ [name]: value }));
    },
    [dispatch]
  );

  return (
    <div className="auth-page__popup popup">
      <div className="popup__header">
        <h4 className="auth-page__title">Регистрация</h4>
        <Button icon="close" onClick={onClose} isCircular isGhost />
      </div>
      <div className="auth-page__form auth-page__form_type_register">
        <Field
          value={registerLogin}
          theme="filled"
          name="registerLogin"
          title="Логин"
          onChange={onChangeInputHandler}
        />
        <Field
          value={registerPassword}
          theme="filled"
          name="registerPassword"
          type="password"
          title="Пароль"
          onChange={onChangeInputHandler}
        />
        <Field
          value={registerPasswordConfirm}
          theme="filled"
          name="registerPasswordConfirm"
          type="password"
          title="Пароль повторно"
          onChange={onChangeInputHandler}
        />
        <Button
          className="auth-page__btn auth-page__btn_type_main"
          onClick={onRegisterHandler}
          isLoading={tryRegisterIndicator}
          size="sm"
          isFluid
          isOutline
          hasRipple
          theme="primary"
        >
          Зарегистрироваться
        </Button>
        {registerErrors && <span className="auth-page__errors">{registerErrors}</span>}
      </div>
    </div>
  );
}

export const RegisterForm = memo(RegisterFormComponent);
