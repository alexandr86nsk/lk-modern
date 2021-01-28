import React, { memo } from 'react';
import './App.scss';
import { useLocation, useRoutes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { useShallowEqualSelector } from '@src/hooks';
import { routes } from '@src/routes';

import { Background } from '@components/Background/Background';
import { PageWrapper } from '@components/PageWrapper';

import { AuthPage } from '@pages/AuthPage';

import { authSelectors } from '@store/auth';

function Application() {
  const token = useShallowEqualSelector(authSelectors.token);
  const isAuth = !!token;
  const element = useRoutes(routes);
  const { pathname } = useLocation();

  return (
    <div className="application" data-theme="default">
      <Background hasCorners />
      {isAuth ? (
        <PageWrapper>
          <TransitionGroup>
            <CSSTransition key={pathname} classNames="fade" timeout={300}>
              {element}
            </CSSTransition>
          </TransitionGroup>
        </PageWrapper>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export const App = memo(Application);
