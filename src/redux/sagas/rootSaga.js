import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';
import * as settingsSaga from './settings/settingsSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
  yield takeLatest('SETTINGS_STORE_GET_SETTINGS', settingsSaga.canBeCanceledSettingsStoreGetSettings);
  yield takeLatest('SETTINGS_STORE_SAVE_SETTINGS', settingsSaga.canBeCanceledSettingsStoreSaveSettings);
  yield takeLatest('SETTINGS_STORE_GET_USERS', settingsSaga.canBeCanceledSettingsStoreGetUsers);
}

export default rootSaga;
