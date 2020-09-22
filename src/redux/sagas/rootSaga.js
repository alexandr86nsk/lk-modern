import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';
import * as briefcasesSaga from './briefcases/briefcasesSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
  yield takeLatest('BRIEFCASES_STORE_GET_BRIEFCASES', briefcasesSaga.canBeCanceledBriefcasesStoreGetBriefcases);
}

export default rootSaga;
