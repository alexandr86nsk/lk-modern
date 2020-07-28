import React from 'react';
import './PageHeader.scss';
import { connect } from 'react-redux';
import MenuIcon from '../../static/images/menu.svg';
import actions from '../../redux/actions/actions';
import UserInfo from './UserInfo';

function PageHeader(props) {
  const {
    userInfo,
    showSidebar,
    globalStoreSetValue,
    userStoreClear,
    clearToken,
  } = props;

  const {
    FirstName: firstName,
    MiddleName: middleName,
    LastName: lastName,
  } = userInfo || {};

  React.useEffect(() => () => userStoreClear(), [userStoreClear]);

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
        {(firstName || middleName || lastName) && (
        <UserInfo
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          logout={logout}
        />
        )}
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  showSidebar: state.globalStore.showSidebar,
  userInfo: state.userStore,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
