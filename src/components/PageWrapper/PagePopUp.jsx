import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIPopUp from '../UIPopUp/UIPopUp';

function PagePopUp(props) {
  const {
    popUpStore,
    popUpStoreClear,
  } = props || {};

  const { show } = popUpStore || {};

  const handleHidePopUp = React.useCallback(() => {
    popUpStoreClear();
  }, [popUpStoreClear]);

  return (
    <>
        {show && (<UIPopUp {...popUpStore} callback={handleHidePopUp} />)}
    </>
  );
}

const mapStateToProps = (state) => ({
  popUpStore: state.popUpStore,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(PagePopUp);
