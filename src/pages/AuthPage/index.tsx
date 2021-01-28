import React, { memo, useCallback, useState } from 'react';

import './styles.scss';

import { useEscapeClick } from '@src/hooks';

import { Logo } from '@components/Logo/Logo';
import { Overlay } from '@components/Overlay';

import { RegisterForm } from '@pages/AuthPage/RegisterForm';

import { AuthForm } from './AuthForm';

function AuthPageComponent() {
  const [register, setRegister] = useState(false);
  const onRegisterHandle = useCallback(() => {
    setRegister((prev) => !prev);
  }, []);

  useEscapeClick(onRegisterHandle);

  return (
    <div className="auth-page">
      <div className="auth-page__inner">
        <div className="auth-page__content">
          <div className="auth-page__logo">
            <Logo direction="column" />
          </div>
          <AuthForm onRegister={onRegisterHandle} />
          <Overlay in={register}>
            <RegisterForm onClose={onRegisterHandle} />
          </Overlay>
        </div>
        <div className="auth-page__footer">
          <div className="auth-page__copyright">
            <span>© 2021</span>
            <span>Real Studio</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AuthPage = memo(AuthPageComponent);
