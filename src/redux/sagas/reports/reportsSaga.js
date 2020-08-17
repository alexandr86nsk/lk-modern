import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import saveAs from 'file-saver';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i += 1) view[i] = s.charCodeAt(i) & 0xFF;
  return buf;
};

/* ***************************** reportsStoreGetRatingReportBySettlements ********************** */
function* reportsStoreGetRatingReportBySettlements(value) {
  yield put(actions.reportsStoreSetSection({
    tryGetRatingReportBySettlements: true,
  }));
  yield queryResultAnalysis(
    api.reportsStoreGetRatingReportBySettlements,
    value,
    function* (res) {
      yield put(actions.reportsStoreSetSection({
        tryGetRatingReportBySettlements: false,
      }));
      /* const file = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL); */
      // window.open(`data:application/vnd.ms-excel;base64,${res}`, '_blank');
      // window.open(`data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${res}`, '_blank');
      saveAs(new File([res], 'Slot.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        tryGetRatingReportBySettlements: false,
      }));
    },
  );
}

export function* canBeCanceledReportsStoreGetRatingReportBySettlements(action) {
  const bgReportsStoreGetRatingReportBySettlements = yield fork(
    reportsStoreGetRatingReportBySettlements,
    action.value,
  );
  yield take('REPORTS_STORE_GET_RATING_REPORT_BY_SETTLEMENTS_CANCEL');
  yield cancel(bgReportsStoreGetRatingReportBySettlements);
}

/* ***************************** reportsStoreGetOperationalReport ********************** */
function* reportsStoreGetOperationalReport(value) {
  yield put(actions.reportsStoreSetSection({
    tryGetOperationalReport: true,
  }));
  yield queryResultAnalysis(
    api.reportsStoreGetOperationalReport,
    value,
    function* (res) {
      yield put(actions.reportsStoreSetSection({
        res,
        tryGetOperationalReport: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        tryGetOperationalReport: false,
      }));
    },
  );
}

export function* canBeCanceledReportsStoreGetOperationalReport(action) {
  const bgReportsStoreGetOperationalReport = yield fork(
    reportsStoreGetOperationalReport,
    action.value,
  );
  yield take('REPORTS_STORE_GET_OPERATIONAL_REPORT_CANCEL');
  yield cancel(bgReportsStoreGetOperationalReport);
}
