import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
}

export default rootSaga;
