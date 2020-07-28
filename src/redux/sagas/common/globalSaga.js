import { put } from 'redux-saga/effects';
import actions from '../../actions/actions';

export function* setErrorToast(text) {
  const toast = {
    id: Math.random(),
    color: 'red',
    text,
  };
  yield put(actions.toastsStoreAddToast(toast));
}

export function* setSuccessToast(text) {
  const toast = {
    id: Math.random(),
    color: 'green',
    text,
  };
  yield put(actions.toastsStoreAddToast(toast));
}
