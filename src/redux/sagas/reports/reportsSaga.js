import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
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
        report: res,
        tryGetRatingReportBySettlements: false,
      }));
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

/* ***************************** reportsStoreGetRatingReportBySettlements2 ********************** */
function* reportsStoreGetRatingReportBySettlements2(value) {
  yield call(console.log, value);
}

export function* canBeCanceledZoneStoreGetZoneInfo(action) {
  const bgZoneStoreGetZoneInfo = yield fork(reportsStoreGetRatingReportBySettlements2, action.value);
  yield take('ZONE_STORE_GET_ZONE_INFO_CANCEL');
  yield cancel(bgZoneStoreGetZoneInfo);
}
