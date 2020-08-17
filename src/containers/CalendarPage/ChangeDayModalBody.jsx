import React from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import UIInput from '../../components/UIInput/UIInput';

function ChangeDayModalBody(props) {
  const {
    tempData,
    modalStoreSetTempDataValue,
    title,
    isHoliday,
  } = props || {};

  const {
    changeDescription,
  } = tempData || {};

  return (
    <div className="calendar__change-day-modal-body">
      <div>{`Действительно хотите сделать ${title} ${isHoliday ? 'рабочим' : 'не рабочим'} днем?`}</div>
{/*      {!isHoliday && (
      <UIInput
        title="Комментарий"
        name="changeDescription"
        callback={modalStoreSetTempDataValue}
        data={changeDescription}
        type="--style-1c"
      />
      )}*/}
    </div>
  );
}

const mapStateToProps = (state) => ({
  tempData: state.modalStore.tempData,
});

const mapDispatchToProps = { ...actions };

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDayModalBody);
