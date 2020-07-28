import React from 'react';
import './PageHeader.scss';
import { connect } from 'react-redux';
import MenuIcon from '../../static/images/menu.svg';
import actions from '../../redux/actions/actions';
import UserInfo from './UserInfo';


function PageHeader(props) {
  const {
    name,
    family,
    username,
    showSidebar,
    globalStoreSetValue,
    userStoreGetUserInfo,
    userStoreClear,
    clearToken,
  } = props;

  React.useEffect(() => () => userStoreClear(), [userStoreClear]);

  React.useEffect(() => {
    userStoreGetUserInfo();
  }, [userStoreGetUserInfo]);

  const logout = React.useCallback(() => {
    clearToken();
  }, [clearToken]);

  const handleShowSidebar = React.useCallback(() => {
    globalStoreSetValue('showSidebar', !showSidebar);
  }, [globalStoreSetValue, showSidebar]);

  return (
    <header className="page-header">
      <div
        role="presentation"
        className="page-header__sidebar-icon"
        onClick={handleShowSidebar}
      >
        <MenuIcon />
      </div>
      <div className="page-header__user-info-wrapper">
        {name && (
        <UserInfo
          firstName={name}
          lastName={family}
          logout={logout}
          avatar={username}
        />
        )}
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  showSidebar: state.globalStore.showSidebar,
  name: state.userStore.given_name,
  family: state.userStore.family_name,
  username: state.userStore.preferred_username,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
