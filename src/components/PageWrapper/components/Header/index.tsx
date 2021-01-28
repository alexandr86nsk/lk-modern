import React, { useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';

import { Logo } from '@components/Logo/Logo';

import { coreActions } from '@store/core';

import menuIcon from '@assets/icons/menu.svg';

import { User } from './components/User';

import './styles.scss';

function HeaderComponent() {
  const dispatch = useDispatch();

  const changeSidebarStateHandler = useCallback(() => {
    dispatch(coreActions.changeShowSidebarState());
  }, [dispatch]);

  return (
    <header className="header">
      <button className="header__button" onClick={changeSidebarStateHandler}>
        <img className="icon" src={menuIcon} alt="menu" />
      </button>
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__user">
        <User />
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
