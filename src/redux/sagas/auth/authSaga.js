import {
  call, put,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';

export function* fetchWinAuth() {
  try {
    const token = yield call(console.log, 'aaa');
    yield put(actions.setToken(token.data.access_token));
  } catch (e) {
    yield put(actions.authStoreSetValue('tryWinAuth', false));
  }
}

export function* fetchLogIn(action) {
  try {
    yield put(actions.authStoreSetTryLogIn(true));
    const token = yield call(api.logIn, action.value);
    yield put(actions.setToken(token.data.access_token));
    yield put(actions.authStoreSetTryLogIn(false));
  } catch (e) {
    yield put(actions.authStoreSetErrors(e.data && e.data.error_description ? e.data.error_description : 'Неизвестная ошибка'));
    yield put(actions.authStoreSetTryLogIn(false));
  }
}
