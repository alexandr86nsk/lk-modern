import { fork } from 'redux-saga/effects';

import { watchAuthServices } from '@store/auth/saga';

export function* rootSaga() {
  yield fork(watchAuthServices);
}
