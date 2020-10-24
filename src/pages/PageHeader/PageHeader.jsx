import React from 'react';
import './PageHeader.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UserInfo from './UserInfo';
import menuIcon from '../../static/images/resp.gif';
import UILogo from '../../components/UILogo/UILogo';

function PageHeader(props) {
  const {
    token,
    tokenStoreClear,
    globalStoreSetSection,
  } = props || {};

  const logout = React.useCallback(() => {
    tokenStoreClear();
  }, [tokenStoreClear]);

  const handleMenuHide = React.useCallback(() => {
    globalStoreSetSection({
      showSidebar: true,
    });
  }, [globalStoreSetSection]);

  return (
    <header className="page-header">
      <div
        role="presentation"
        className="page-header__menu"
        onClick={handleMenuHide}
      >
        <img className="page-header__menu-icon" src={menuIcon} alt="menu" />
      </div>
      <div className="page-header__logo">
        <UILogo />
      </div>
      <div className="page-header__user-info-wrapper">
        <UserInfo logout={logout} token={token} />
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  token: state.tokenStore.token,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
