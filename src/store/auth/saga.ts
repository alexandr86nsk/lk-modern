import { PayloadAction } from '@reduxjs/toolkit';
import { SagaIterator } from 'redux-saga';
import { call, put, take, cancel, fork, takeLatest } from 'redux-saga/effects';

import { authActions, GetAuthActionType } from '@store/auth';

import { logIn } from '@services/auth';

function* getAuthSaga({ payload }: PayloadAction<GetAuthActionType>) {
  try {
    const token = yield call(logIn, payload);
    yield put(authActions.setToken(token));
  } catch (error) {
    yield put(authActions.setErrors(error.message));
  }
}

function* canBeCanceledGetAuthSaga(action: PayloadAction<GetAuthActionType>) {
  const bgGetTokenSaga = yield fork(getAuthSaga, action);
  yield take(authActions.getAuthCancel.type);
  yield cancel(bgGetTokenSaga);
}

export function* watchTokenServices(): SagaIterator {
  yield takeLatest(authActions.getAuth.type, canBeCanceledGetAuthSaga);
}
