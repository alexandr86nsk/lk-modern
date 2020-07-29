import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';
import { canBeCanceledSettingsStoreGetSettings, canBeCanceledSettingsStoreSaveSettings } from './settings/settingsSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
  yield takeLatest('SETTINGS_STORE_GET_SETTINGS', canBeCanceledSettingsStoreGetSettings);
  yield takeLatest('SETTINGS_STORE_SAVE_SETTINGS', canBeCanceledSettingsStoreSaveSettings);
}

export default rootSaga;
