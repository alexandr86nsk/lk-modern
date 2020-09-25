import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';
import * as briefcasesSaga from './briefcases/briefcasesSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
  yield takeLatest('BRIEFCASES_STORE_GET_BRIEFCASES', briefcasesSaga.canBeCanceledBriefcasesStoreGetBriefcases);
  yield takeLatest('BRIEFCASES_STORE_GET_MAIN_SETTINGS', briefcasesSaga.canBeCanceledGetMainSettings);
  yield takeLatest('BRIEFCASES_STORE_GET_RECALL_SETTINGS', briefcasesSaga.canBeCanceledGetRecallSettings);
  yield takeLatest('BRIEFCASES_STORE_GET_TIME_ZONE_SETTINGS', briefcasesSaga.canBeCanceledGetTimeZoneSettings);
  yield takeLatest('BRIEFCASES_STORE_SAVE_MAIN_SETTINGS', briefcasesSaga.canBeCanceledSaveMainSettings);
}

export default rootSaga;
