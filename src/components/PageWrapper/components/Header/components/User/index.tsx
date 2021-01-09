import cn from 'classnames';
import React, { memo, useRef, useCallback, useState, useMemo, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useOutsideClick } from '@src/hooks';
import { useShallowEqualSelector } from '@src/hooks';
import { CallbackFunctionType } from '@src/types';

import { authActions, authSelectors } from '@store/auth';

import AvatarIcon from './avatar.svg';
import { userMenu } from './menu';

type MenuItemPropsType = {
  id: string;
  type?: string;
  title: string;
  icon: ReactElement;
  link?: string;
  logout?: CallbackFunctionType;
};

const ROLES = {
  administrator: 'Администратор',
  user: 'Пользователь',
};

function UserComponent() {
  const menuEl = useRef<HTMLDivElement>(null);
  const [active, toggle] = useState(false);

  const dispatch = useDispatch();
  const token = useShallowEqualSelector(authSelectors.token);

  const logout = useCallback(() => {
    dispatch(authActions.clear());
  }, [dispatch]);

  const changeMenuStateHandler = useCallback(() => {
    toggle((prev) => !prev);
  }, []);

  const hideMenuHandler = useCallback(() => {
    toggle(false);
  }, []);

  useOutsideClick(menuEl, hideMenuHandler);

  const { userName, userRole } = useMemo(() => {
    if (token) {
      return { userName: 'Иванов Иван Иванович', userRole: ROLES['user'] };
    }
    return {};
  }, [token]);

  return (
    <div
      className={cn('user', {
        user_status_active: active,
      })}
    >
      <div
        role="presentation"
        className="user__button"
        onClick={changeMenuStateHandler}
        ref={menuEl}
      >
        <div className="user__avatar">
          <AvatarIcon />
        </div>
        <div className="user__title">
          <span>{userName || 'Не указано'}</span>
          {userRole && <span>{userRole}</span>}
        </div>
      </div>
      <div className="user__menu">
        <nav className="menu">
          {userMenu.map((item) => (
            <MenuItem {...item} logout={logout} />
          ))}
        </nav>
      </div>
    </div>
  );
}

function MenuItem({ id, type, title, icon, link = '/', logout }: MenuItemPropsType) {
  if (type === 'logout') {
    return (
      <button key={id} className="menu__item" onClick={logout}>
        {icon}
        <span>{title}</span>
      </button>
    );
  }
  return (
    <Link key={id} className="menu__item" to={link}>
      {icon}
      <span>{title}</span>
    </Link>
  );
}

export const User = memo(UserComponent);
