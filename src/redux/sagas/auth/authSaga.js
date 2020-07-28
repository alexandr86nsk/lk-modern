import {
  put, fork, take, cancel,
} from 'redux-saga/effects';
import jwt from 'jwt-decode';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis } from '../common/globalSaga';

/* ***************************** authStoreLogIn ********************** */
function* authStoreLogIn(value) {
  yield put(actions.authStoreSetSection({
    tryLogIn: true,
  }));
  yield queryResultAnalysis(
    api.logIn,
    value,
    function* (res) {
      yield put(actions.authStoreSetSection({
        tryLogIn: false,
      }));
      const {
        access_token: accessToken,
        refresh_token: refreshToken,
      } = res || {};
      yield put(actions.tokenStoreSetSection({
        token: accessToken,
        refreshToken,
      }));
      yield put(actions.userStoreSetSection({ ...jwt(accessToken) }));
    },
    function* (err) {
      yield put(actions.authStoreSetSection({
        tryLogIn: false,
        errors: err && err.response && err.response.data && err.response.data.error ? err.response.data.error : 'Неизвестная ошибка',
      }));
    },
  );
}

export default function* canBeCanceledAuthStoreLogIn(action) {
  const bgAuthStoreLogIn = yield fork(authStoreLogIn, action.value);
  yield take('AUTH_STORE_LOG_IN_CANCEL');
  yield cancel(bgAuthStoreLogIn);
}
