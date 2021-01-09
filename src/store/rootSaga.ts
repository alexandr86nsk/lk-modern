import { fork } from 'redux-saga/effects';

import { watchTokenServices } from '@store/auth/saga';

export function* rootSaga() {
  yield fork(watchTokenServices);
}
