import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import saveAs from 'file-saver';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

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
      const bytes = new Uint8Array(res.length);

      for (let i = 0; i < bytes.length; i += 1) {
        bytes[i] = res.charCodeAt(i);
      }
      const blob = new Blob([bytes], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      saveAs(blob, 'action.xlsx');
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
