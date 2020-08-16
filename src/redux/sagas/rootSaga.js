import { takeLatest, takeEvery } from 'redux-saga/effects';
import canBeCanceledAuthStoreLogIn from './auth/authSaga';
import * as settingsSaga from './settings/settingsSaga';
import * as zoneSaga from './zone/zoneSaga';
import * as reportsSaga from './reports/reportsSaga';

function* rootSaga() {
  yield takeLatest('AUTH_STORE_LOG_IN', canBeCanceledAuthStoreLogIn);
  yield takeLatest('SETTINGS_STORE_GET_SETTINGS', settingsSaga.canBeCanceledSettingsStoreGetSettings);
  yield takeLatest('SETTINGS_STORE_SAVE_SETTINGS', settingsSaga.canBeCanceledSettingsStoreSaveSettings);
  yield takeLatest('SETTINGS_STORE_GET_USERS', settingsSaga.canBeCanceledSettingsStoreGetUsers);
  yield takeLatest('SETTINGS_STORE_GET_USER_ROLES', settingsSaga.canBeCanceledSettingsStoreGetUserRoles);
  yield takeLatest('SETTINGS_STORE_GET_USER_INFO', settingsSaga.canBeCanceledSettingsStoreGetUserInfo);
  yield takeLatest('SETTINGS_STORE_SAVE_USER', settingsSaga.canBeCanceledSettingsStoreSaveUser);
  yield takeLatest('SETTINGS_STORE_REMOVE_USER', settingsSaga.canBeCanceledSettingsStoreRemoveUser);
  yield takeLatest('SETTINGS_STORE_GET_TEMPLATES', settingsSaga.canBeCanceledSettingsStoreGetTemplates);
  yield takeLatest('SETTINGS_STORE_GET_TEMPLATE_INFO', settingsSaga.canBeCanceledSettingsStoreGetTemplateInfo);
  yield takeLatest('SETTINGS_STORE_SAVE_TEMPLATE', settingsSaga.canBeCanceledSettingsStoreSaveTemplate);
  yield takeLatest('SETTINGS_STORE_REMOVE_TEMPLATE', settingsSaga.canBeCanceledSettingsStoreRemoveTemplate);
  yield takeLatest('SETTINGS_STORE_GET_TEMPLATE_VAR', settingsSaga.canBeCanceledSettingsStoreGetTemplateVar);
  yield takeLatest('SETTINGS_STORE_DADATA_GET_ADDRESS', settingsSaga.canBeCanceledSettingsStoreDadataGetAddress);
  yield takeLatest('ZONE_STORE_GET_ZONES', zoneSaga.canBeCanceledZoneStoreGetZones);
  yield takeLatest('ZONE_STORE_GET_ZONE_INFO', zoneSaga.canBeCanceledZoneStoreGetZoneInfo);
  yield takeEvery('ZONE_STORE_GET_USERS', zoneSaga.canBeCanceledZoneStoreGetUsers);
  yield takeLatest('ZONE_STORE_SAVE_ZONE', zoneSaga.canBeCanceledZoneStoreSaveZone);
  yield takeLatest('ZONE_STORE_REMOVE_ZONE', zoneSaga.canBeCanceledZoneStoreRemoveZone);
  yield takeLatest('ZONE_STORE_ADD_ZONE_USER', zoneSaga.canBeCanceledZoneStoreAddZoneUser);
  yield takeLatest('ZONE_STORE_REMOVE_ZONE_USER', zoneSaga.canBeCanceledZoneStoreRemoveZoneUser);
  yield takeLatest('ZONE_STORE_DADATA_GET_ADDRESS', zoneSaga.canBeCanceledZoneStoreDadataGetAddress);
  yield takeLatest('REPORTS_STORE_GET_RATING_REPORT_BY_SETTLEMENTS', reportsSaga.canBeCanceledReportsStoreGetRatingReportBySettlements);
}

export default rootSaga;
