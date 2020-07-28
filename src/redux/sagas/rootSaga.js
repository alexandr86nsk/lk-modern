import { takeLatest, takeEvery } from 'redux-saga/effects';
import { fetchWinAuth, fetchLogIn } from './auth/authSaga';
import * as briefcaseSaga from './briefcase/briefcaseSaga';
import * as settingsSaga from './settings/settingsSaga';
import * as reportsSaga from './reports/reportsSaga';
import * as testPageSaga from './test/testPageSaga';
import canBeCanceledGetAllReferences from './references/referencesSaga';


function* rootSaga() {
  yield takeLatest('AUTH_STORE_WIN_AUTH', fetchWinAuth);
  yield takeLatest('AUTH_STORE_LOG_IN', fetchLogIn);
  yield takeLatest('BRIEFCASE_STORE_GET_BRIEFCASE_LIST', briefcaseSaga.canBeCanceledGetBriefcaseList);
  // yield takeLatest('BRIEFCASE_STORE_GET_QUEUE_ASTERISK_OPTIONS', briefcaseSaga.canBeCanceledGetQueueAsteriskOptions);
  yield takeLatest('BRIEFCASE_STORE_GET_QUEUE_ASTERISK_SETTINGS', briefcaseSaga.canBeCanceledGetQueueAsteriskSettings);
  yield takeLatest('BRIEFCASE_STORE_SAVE_RECALL_SETTINGS', briefcaseSaga.canBeCanceledSaveQueueAsteriskRecallSettings);
  yield takeLatest('BRIEFCASE_STORE_SAVE_TIME_ZONE_SETTINGS', briefcaseSaga.canBeCanceledSaveQueueAsteriskTimeZoneSettings);
  yield takeLatest('BRIEFCASE_STORE_SAVE_QUEUE_ASTERISK_SETTINGS', briefcaseSaga.canBeCanceledSaveQueueAsteriskSettings);
  yield takeLatest('BRIEFCASE_STORE_START_BRIEFCASE', briefcaseSaga.canBeCanceledStartBriefcase);
  yield takeLatest('BRIEFCASE_STORE_STOP_BRIEFCASE', briefcaseSaga.canBeCanceledStopBriefcase);
  yield takeLatest('BRIEFCASE_STORE_ADD_BRIEFCASE', briefcaseSaga.canBeCanceledAddBriefcase);
  yield takeLatest('BRIEFCASE_STORE_DELETE_BRIEFCASE', briefcaseSaga.canBeCanceledDeleteBriefcase);
  yield takeLatest('BRIEFCASE_STORE_UPDATE_BRIEFCASE', briefcaseSaga.canBeCanceledUpdateBriefcase);
  yield takeLatest('BRIEFCASE_STORE_UPDATE_BRIEFCASE_FILE', briefcaseSaga.canBeCanceledUpdateBriefcaseFile);
  yield takeLatest('BRIEFCASE_STORE_GET_BRIEFCASE', briefcaseSaga.canBeCanceledGetBriefcase);
  yield takeLatest('BRIEFCASE_STORE_GET_BRIEFCASE_CALLS', briefcaseSaga.canBeCanceledGetBriefcaseCalls);
  yield takeLatest('SETTINGS_STORE_GET_ALL', settingsSaga.canBeCanceledGetAllSettings);
  yield takeLatest('SETTINGS_STORE_UPDATE_MAIN', settingsSaga.canBeCanceledUpdateMainSettings);
  yield takeLatest('SETTINGS_STORE_UPDATE_RECALL', settingsSaga.canBeCanceledUpdateRecallSettings);
  yield takeLatest('SETTINGS_STORE_UPDATE_TIME_ZONE', settingsSaga.canBeCanceledUpdateTimeZoneSettings);
  yield takeLatest('SETTINGS_STORE_UPDATE_QUEUE_PHONE', settingsSaga.canBeCanceledUpdateQueuePhoneSettings);
  yield takeLatest('REPORTS_STORE_GET_BRIEFCASES', reportsSaga.canBeCanceledGetBriefcases);
  yield takeLatest('REPORTS_STORE_GET_HISTORY', reportsSaga.canBeCanceledGetHistoryReport);
  yield takeLatest('REPORTS_STORE_GET_HISTORY_EXCELL', reportsSaga.canBeCanceledGetHistoryExcell);
  yield takeLatest('REPORTS_STORE_GET_ACTUAL_STATE', reportsSaga.canBeCanceledGetActualStateReport);
  yield takeLatest('REPORTS_STORE_GET_CALL_STATISTIC', reportsSaga.canBeCanceledGetCallStatisticReport);
  yield takeLatest('REPORTS_STORE_GET_OPERATOR_INFO', reportsSaga.canBeCanceledGetOperatorInfoReport);
  yield takeLatest('REFERENCES_STORE_GET_ALL', canBeCanceledGetAllReferences);
  yield takeEvery('TEST_PAGE_STORE_GET_JOB_DETAIL_REPORT', testPageSaga.canBeCanceledGetJobDetailReport);
  yield takeEvery('TEST_PAGE_STORE_GET_JOB_STATUS_REPORT', testPageSaga.canBeCanceledGetJobStatusReport);
  yield takeEvery('TEST_PAGE_STORE_GET_JOB_HISTORY_REPORT', testPageSaga.canBeCanceledGetJobHistoryReport);
  yield takeEvery('TEST_PAGE_STORE_GET_JOB_CALL_HANDLING_REPORT', testPageSaga.canBeCanceledGetJobCallHandlingReport);
}

export default rootSaga;
