import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, take, cancel, fork, takeLatest } from 'redux-saga/effects';

import { authActions, GetAuthAction, GetRegisterAction } from '@store/auth';

import { logIn, createAccount } from '@services/auth';

function* getAuthSaga({ payload }: PayloadAction<GetAuthAction>) {
  try {
    const token = yield call(logIn, payload);
    yield put(authActions.setToken(token));
  } catch (error) {
    yield put(authActions.setErrors(error.message));
  }
}

function* canBeCanceledGetAuthSaga(action: PayloadAction<GetAuthAction>) {
  const bgGetAuthSaga = yield fork(getAuthSaga, action);
  yield take(authActions.getAuthCancel.type);
  yield cancel(bgGetAuthSaga);
}

function* getRegisterSaga({ payload }: PayloadAction<GetAuthAction>) {
  try {
    const token = yield call(createAccount, payload);
    yield put(authActions.setToken(token));
  } catch (error) {
    yield put(authActions.setErrors(error.message));
  }
}

function* canBeCanceledGetRegisterSaga(action: PayloadAction<GetRegisterAction>) {
  const bgGetRegisterSaga = yield fork(getRegisterSaga, action);
  yield take(authActions.getRegisterCancel.type);
  yield cancel(bgGetRegisterSaga);
}

export function* watchAuthServices(): SagaIterator {
  yield takeLatest(authActions.getAuth.type, canBeCanceledGetAuthSaga);
  yield takeLatest(authActions.getRegister.type, canBeCanceledGetRegisterSaga);
}
