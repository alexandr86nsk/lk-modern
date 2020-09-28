import {
  put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** getMainSettings ********************** */
function* getMainSettings() {
  yield put(actions.settingsStoreSetSection({
    loadingMainSettings: true,
  }));
  yield queryResultAnalysis(
    api.getMainSettings,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        main: res,
        loadingMainSettings: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        main: undefined,
        loadingMainSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetMain() {
  const bgGetMainSettings = yield fork(getMainSettings);
  yield take('SETTINGS_STORE_GET_MAIN_CANCEL');
  yield cancel(bgGetMainSettings);
}

/* ***************************** getRecallSettings ********************** */
function* getRecallSettings() {
  yield put(actions.settingsStoreSetSection({
    loadingRecallSettings: true,
  }));
  yield queryResultAnalysis(
    api.getRecallSettings,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        recall: res,
        loadingRecallSettings: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        recall: undefined,
        loadingRecallSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetRecall() {
  const bgGetRecallSettings = yield fork(getRecallSettings);
  yield take('SETTINGS_STORE_GET_RECALL_CANCEL');
  yield cancel(bgGetRecallSettings);
}

/* ***************************** getTimeZoneSettings ********************** */
function* getTimeZoneSettings() {
  yield put(actions.settingsStoreSetSection({
    loadingTimeZoneSettings: true,
  }));
  yield queryResultAnalysis(
    api.getTimeZoneSettings,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        timeZone: res,
        loadingTimeZoneSettings: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        timeZone: undefined,
        loadingTimeZoneSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetTimeZone() {
  const bgGetTimeZoneSettings = yield fork(getTimeZoneSettings);
  yield take('SETTINGS_STORE_GET_TIME_ZONE_CANCEL');
  yield cancel(bgGetTimeZoneSettings);
}

/*/!* ***************************** getQueuePhoneSettings ********************** *!/
function* getQueuePhoneSettings() {
  yield put(actions.settingsStoreSetSection({
    loadingQueuePhoneSettings: true,
  }));
  yield queryResultAnalysis(
    api.getQueuePhoneSettings,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        queuePhone: res,
        loadingQueuePhoneSettings: false,
        loadingQueueControlTypes: true,
      }));
      yield queryResultAnalysis(
        api.getQueueAsteriskControlTypes,
        undefined,
        function* (result) {
          yield put(actions.settingsStoreSetSection({
            queueControlTypes: result && Array.isArray(result) && result.map((v) => ({
              value: v.Id,
              label: v.Name,
            })),
            loadingQueueControlTypes: false,
          }));
        },
        function* () {
          yield put(actions.settingsStoreSetSection({
            queueControlTypes: undefined,
            loadingQueueMainSettings: false,
          }));
        },
      );
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        queuePhone: undefined,
        loadingQueuePhoneSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetQueuePhone() {
  const bgGetQueuePhoneSettings = yield fork(getQueuePhoneSettings);
  yield take('SETTINGS_STORE_GET_QUEUE_PHONE_CANCEL');
  yield cancel(bgGetQueuePhoneSettings);
}*/

/* ***************************** updateMainSettings ********************** */
function* updateMainSettings(value) {
  yield put(actions.settingsStoreSetSection({
    updatingMainSettings: true,
  }));
  yield queryResultAnalysis(
    api.updateMainSettings,
    value,
    function* () {
      yield put(actions.settingsStoreSetSection({
        updatingMainSettings: false,
      }));
      yield setSuccessToast('Основные настройки успешно сохранены.');
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        updatingMainSettings: false,
      }));
    },
  );
}

export function* canBeCanceledUpdateMain(action) {
  const bgUpdateMainSettings = yield fork(updateMainSettings, action.value);
  yield take('SETTINGS_STORE_UPDATE_MAIN_CANCEL');
  yield cancel(bgUpdateMainSettings);
}

/* ***************************** updateRecallSettings ********************** */
function* updateRecallSettings(value) {
  yield put(actions.settingsStoreSetSection({
    updatingRecallSettings: true,
  }));
  yield queryResultAnalysis(
    api.updateRecallSettings,
    value,
    function* () {
      yield put(actions.settingsStoreSetSection({
        updatingRecallSettings: false,
      }));
      yield setSuccessToast('Настройки перезвона успешно сохранены.');
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        updatingRecallSettings: false,
      }));
    },
  );
}

export function* canBeCanceledUpdateRecall(action) {
  const bgUpdateRecallSettings = yield fork(updateRecallSettings, action.value);
  yield take('SETTINGS_STORE_UPDATE_RECALL_CANCEL');
  yield cancel(bgUpdateRecallSettings);
}

/* ***************************** updateTimeZoneSettings ********************** */
function* updateTimeZoneSettings(value) {
  yield put(actions.settingsStoreSetSection({
    updatingTimeZoneSettings: true,
  }));
  yield queryResultAnalysis(
    api.updateTimeZoneSettings,
    value,
    function* () {
      yield put(actions.settingsStoreSetSection({
        updatingTimeZoneSettings: false,
      }));
      yield setSuccessToast('Настройки часовых поясов успешно сохранены.');
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        updatingTimeZoneSettings: false,
      }));
    },
  );
}

export function* canBeCanceledUpdateTimeZone(action) {
  const bgUpdateTimeZoneSettings = yield fork(updateTimeZoneSettings, action.value);
  yield take('SETTINGS_STORE_UPDATE_TIME_ZONE_CANCEL');
  yield cancel(bgUpdateTimeZoneSettings);
}

/*/!* ***************************** updateQueuePhoneSettings ********************** *!/
function* updateQueuePhoneSettings(value) {
  yield queryResultAnalysis(
    api.updateQueuePhoneSettings,
    value,
    function* () {
      yield put(actions.settingsStoreChangeQueuePhoneItem(value));
      yield setSuccessToast('Изменения успешно сохранены.');
    },
    function* (err) {
      yield console.log('error: ', err);
    },
  );
}

export function* canBeCanceledUpdateQueuePhone(action) {
  const bgUpdateQueuePhoneSettings = yield fork(updateQueuePhoneSettings, action.value);
  yield take('SETTINGS_STORE_UPDATE_QUEUE_PHONE_CANCEL');
  yield cancel(bgUpdateQueuePhoneSettings);
}*/
