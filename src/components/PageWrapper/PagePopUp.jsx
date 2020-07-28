import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIPopUp from '../UIPopUp/UIPopUp';

function PagePopUp(props) {
  const {
    show,
    item,
    popUpStoreClear,
    hidePageControl,
    pageControlStoreSetSection,
  } = props;

  React.useEffect(() => {
    if (show && hidePageControl) {
      pageControlStoreSetSection({ show: false });
    }
  }, [hidePageControl, pageControlStoreSetSection, show]);

  const handleHidePopUp = React.useCallback(() => {
    popUpStoreClear();
    if (hidePageControl) {
      pageControlStoreSetSection({ show: true });
    }
  }, [hidePageControl, pageControlStoreSetSection, popUpStoreClear]);

  return (
    <>
      {show && <UIPopUp {...item} callback={handleHidePopUp} />}
    </>
  );
}

const mapStateToProps = (state) => ({
  show: state.popUpStore.show,
  hidePageControl: state.popUpStore.hidePageControl,
  item: state.popUpStore,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PagePopUp));
