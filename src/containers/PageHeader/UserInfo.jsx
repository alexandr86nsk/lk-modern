import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import avatarIcon from '../../static/images/user-icon.jpg';
import UserIcon from '../../static/images/avatar.svg';
import LogoutIcon from '../../static/images/logout.svg';
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
    firstName = '',
    lastName = '',
    logout,
    avatar,
  } = props;

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

  return (
    <div
      role="presentation"
      className={`user-info ${showMenu ? 'active' : ''}`}
      onClick={handleShowMenu}
      ref={menuEl}
    >
      <div className="avatar">
        <img src={avatar ? `https://jira.otlnal.ru/secure/useravatar?ownerId=${avatar}` : avatarIcon} alt="avatar" />
      </div>
      <span>{`${firstName} ${lastName}`}</span>
      <div className="user-menu">
        <nav className="user-menu__list">
          {renderUserMenu}
        </nav>
      </div>
    </div>
  );
}

export default React.memo(UserInfo);
