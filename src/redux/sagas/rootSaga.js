import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';
import * as briefcasesSaga from './briefcases/briefcasesSaga';
import * as reportsSaga from './reports/reportsSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
  yield takeLatest('BRIEFCASES_STORE_GET_BRIEFCASES', briefcasesSaga.canBeCanceledBriefcasesStoreGetBriefcases);
  yield takeLatest('BRIEFCASES_STORE_GET_MAIN_SETTINGS', briefcasesSaga.canBeCanceledGetMainSettings);
  yield takeLatest('BRIEFCASES_STORE_GET_RECALL_SETTINGS', briefcasesSaga.canBeCanceledGetRecallSettings);
  yield takeLatest('BRIEFCASES_STORE_GET_TIME_ZONE_SETTINGS', briefcasesSaga.canBeCanceledGetTimeZoneSettings);
  yield takeLatest('BRIEFCASES_STORE_SAVE_MAIN_SETTINGS', briefcasesSaga.canBeCanceledSaveMainSettings);
  yield takeLatest('REPORTS_STORE_GET_BRIEFCASES', reportsSaga.canBeCanceledGetBriefcases);
  yield takeLatest('REPORTS_STORE_GET_HISTORY', reportsSaga.canBeCanceledGetHistoryReport);
  yield takeLatest('REPORTS_STORE_GET_HISTORY_EXCELL', reportsSaga.canBeCanceledGetHistoryExcell);
  yield takeLatest('REPORTS_STORE_GET_ACTUAL_STATE', reportsSaga.canBeCanceledGetActualStateReport);
  yield takeLatest('REPORTS_STORE_GET_CALL_STATISTIC', reportsSaga.canBeCanceledGetCallStatisticReport);
  yield takeLatest('REPORTS_STORE_GET_OPERATOR_INFO', reportsSaga.canBeCanceledGetOperatorInfoReport);
}

export default rootSaga;
