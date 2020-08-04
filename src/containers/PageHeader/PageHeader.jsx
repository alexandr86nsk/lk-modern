import React from 'react';
import './PageHeader.scss';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UserInfo from './UserInfo';

function PageHeader(props) {
  const {
    token,
    tokenStoreClear,
  } = props || {};

  const logout = React.useCallback(() => {
    tokenStoreClear();
  }, [tokenStoreClear]);

  return (
    <header className="page-header">
      <div className="page-header__user-info-wrapper">
        <UserInfo logout={logout} token={token} />
      </div>
    </header>
  );
}

const mapStateToProps = (state) => ({
  //showSidebar: state.globalStore.showSidebar,
  token: state.tokenStore.token,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);
