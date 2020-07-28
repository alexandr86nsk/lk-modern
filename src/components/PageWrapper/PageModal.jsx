import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIModal from '../UIModal/UIModal';

function PageModal(props) {
  const {
    show,
    data,
    tempData,
    callback,
    outputBody,
    modalStoreClear,
    modalStoreSetSection,
    requiredFields = [],
    isSuccess,
    loading,
    loadingText,
    asyncClose,
    readOnly,
  } = props;

  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    if (show) {
      setTimeout(() => setActive(true), 0);
    } else {
      setTimeout(() => {
        setActive(false);
        modalStoreClear();
      }, 300);
    }
  }, [show, modalStoreClear]);

  const handleCloseModal = React.useCallback((value) => {
    if (value) {
      if (data || data === 0) {
        callback(data, tempData);
      } else {
        callback(tempData);
      }
      if (!asyncClose) {
        modalStoreSetSection({
          show: false,
        });
      }
    } else {
      modalStoreSetSection({
        show: false,
      });
    }
  }, [modalStoreSetSection, asyncClose, callback, data, tempData]);

  const memoizedValidationForm = React.useMemo(() => {
    let errors = 0;
    requiredFields.forEach((v) => {
      if (v.type === 'length') {
        if (!tempData[v.name] || (tempData[v.name].length < v.validation)) {
          errors += 1;
        }
      }
      if (v.type === 'required') {
        if (tempData[v.name] === null || tempData[v.name] === 'undefined' || tempData[v.name] === '') {
          errors += 1;
        }
      }
    });
    return !!errors;
  }, [requiredFields, tempData]);

  const validateIsSuccess = React.useMemo(() => {
    if (isSuccess) {
      return isSuccess(tempData);
    }
    return true;
  }, [isSuccess, tempData]);

  return (
    <div className="page-modal">
      {(active || show)
      && (
      <UIModal
        {...outputBody}
        callback={handleCloseModal}
        disabledPositive={memoizedValidationForm || !validateIsSuccess}
        loading={loading}
        loadingText={loadingText}
        active={active && show}
        readOnly={readOnly}
      />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  show: state.modalStore.show,
  outputBody: state.modalStore.outputBody,
  data: state.modalStore.data,
  tempData: state.modalStore.tempData,
  callback: state.modalStore.callback,
  requiredFields: state.modalStore.requiredFields,
  isSuccess: state.modalStore.isSuccess,
  loading: state.modalStore.loading,
  loadingText: state.modalStore.loadingText,
  asyncClose: state.modalStore.asyncClose,
  readOnly: state.modalStore.readOnly,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PageModal));
