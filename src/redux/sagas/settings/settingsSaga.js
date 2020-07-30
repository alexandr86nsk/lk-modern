import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** settingsStoreGetSettings ********************** */
function* settingsStoreGetSettings() {
  yield put(actions.settingsStoreSetSection({
    settingsLoaded: false,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetSettings,
    null,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        settings: res,
        settingsLoaded: true,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        settings: [],
        settingsLoaded: true,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetSettings() {
  const bgSettingsStoreGetSettings = yield fork(settingsStoreGetSettings);
  yield take('SETTINGS_STORE_GET_SETTINGS_CANCEL');
  yield cancel(bgSettingsStoreGetSettings);
}

/* ***************************** settingsStoreSaveSettings ********************** */
function* settingsStoreSaveSettings(value) {
  yield put(actions.settingsStoreSetSection({
    trySaveSettings: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreSaveSettings,
    value,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        trySaveSettings: false,
        settings: res,
      }));
      yield setSuccessToast('Настройки успешно сохранены');
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        trySaveSettings: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreSaveSettings(action) {
  const bgSettingsStoreSaveSettings = yield fork(settingsStoreSaveSettings, action.value);
  yield take('SETTINGS_STORE_SAVE_SETTINGS_CANCEL');
  yield cancel(bgSettingsStoreSaveSettings);
}

/* ***************************** settingsStoreGetUsers ********************** */
function* settingsStoreGetUsers() {
  yield put(actions.settingsStoreSetUsersTableStoreSection({
    tableLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetUsers,
    null,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        users: [
          ...res,
          ...res,
          ...res,
          ...res,
          ...res,
          ...res,
          ...res,
        ],
      }));
      yield put(actions.settingsStoreSetUsersTableStoreSection({
        tableLoading: false,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        users: [],
      }));
      yield put(actions.settingsStoreSetUsersTableStoreSection({
        tableLoading: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetUsers() {
  const bgSettingsStoreGetUsers = yield fork(settingsStoreGetUsers);
  yield take('SETTINGS_STORE_GET_USERS_CANCEL');
  yield cancel(bgSettingsStoreGetUsers);
}

/* ***************************** settingsStoreGetUserInfo ********************** */
function* settingsStoreGetUserInfo(value) {
  yield put(actions.settingsStoreSetSection({
    userInfoLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetUserInfo,
    value,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        userInfo: res,
        userInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        userInfo: {},
        userInfoLoading: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetUserInfo(action) {
  const bgSettingsStoreGetUserInfo = yield fork(settingsStoreGetUserInfo, action.value);
  yield take('SETTINGS_STORE_GET_USER_INFO_CANCEL');
  yield cancel(bgSettingsStoreGetUserInfo);
}
