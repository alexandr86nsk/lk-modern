import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jwt-decode';
import avatarIcon from '../../static/images/user-icon.jpg';
import UserIcon from '../../static/images/avatar.svg';
import LogoutIcon from '../../static/images/power_settings_new-24px.svg';
import SettingsIcon from '../../static/images/settings.svg';
import useOutsideClick from '../../components/UICustomHooks/useOutsideClick/useOutsideClick';

const userMenu = [
  {
    id: 0,
    title: 'Профиль',
    icon: <UserIcon />,
    link: '/user',
    type: '',
  },
  {
    id: 1,
    title: 'Настройки',
    icon: <SettingsIcon />,
    link: '/',
    type: '',
  },
  {
    id: 2,
    title: 'Выйти',
    icon: <LogoutIcon />,
    link: '',
    type: 'logout',
  },
];

function UserInfo(props) {
  const {
    logout,
    token,
  } = props || {};

  const userData = React.useMemo(() => {
    if (token) {
      return jwt(token);
    }
    return null;
  }, [token]);

  const {
    FirstName: firstName,
    MiddleName: middleName,
    LastName: lastName,
  } = userData || {};

  const menuEl = useRef(null);
  const [showMenu, setShowMenu] = React.useState(false);
  useOutsideClick(menuEl, () => setShowMenu(false));

  const handleShowMenu = React.useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const renderUserMenu = React.useMemo(() => userMenu.map((v) => {
    if (v.type === 'logout') {
      return (
        <div key={v.id} className="user-menu__item" role="presentation" onClick={logout}>
          {v.icon}
          <span>{v.title}</span>
        </div>
      );
    }
    return (
      <Link key={v.id} className="user-menu__item" to={v.link}>
        {v.icon}
        <span>{v.title}</span>
      </Link>
    );
  }), [logout]);

  return firstName || middleName || lastName
    ? (
      <div
        role="presentation"
        className={`user-info ${showMenu ? 'active' : ''}`}
        onClick={handleShowMenu}
        ref={menuEl}
      >
        <div className="avatar">
          <img src={avatarIcon} alt="avatar" />
        </div>
        <span>{`${lastName ? `${lastName} ` : ''}${firstName ? `${firstName} ` : ''}${middleName}`}</span>
        <div className="user-menu">
          <nav className="user-menu__list">
            {renderUserMenu}
          </nav>
        </div>
      </div>
    )
    : null;
}

export default React.memo(UserInfo);
