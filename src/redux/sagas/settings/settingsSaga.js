import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { setErrorToast, setSuccessToast } from '../common/globalSaga';

function* getError(error) {
  if (error.response && error.response.data.description === 'Неверный токен') {
    yield put(actions.clearToken());
  } else if (error.response && error.response.data.description) {
    yield setErrorToast(error.response.data.description);
  } else {
    yield setErrorToast('При зугрузке данных произошла ошибка. Пожалуйста обновите страницу');
  }
}

/* ***************************** getAllSettings ********************** */
function* getAllSettings() {
  try {
    const main = yield call(api.getMainSettings);
    /*const recall = yield call(api.getRecallSettings);
    const timeZone = yield call(api.getTimeZoneSettings);
    const queuePhone = yield call(api.getQueuePhoneSettings);
    const queuePhoneControlTypes = yield call(api.getQueuePhoneControlTypes);*/
    yield put(actions.settingsStoreSetSection({
      dataLoaded: true,
      main: main.data,
      /*recall: recall.data,
      timeZone: timeZone.data,
      queuePhone: queuePhone.data,
      queuePhoneControlTypes: queuePhoneControlTypes.data.map((v) => ({
        value: v.Id,
        label: v.Name,
      })),*/
    }));
  } catch (e) {
    yield put(actions.settingsStoreSetSection({
      dataLoaded: true,
      main: {},
      /*recall: [],
      timeZone: [],
      queuePhone: [],
      queuePhoneControlTypes: [],*/
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetAllSettings() {
  const bgGetAllSettings = yield fork(getAllSettings);
  yield take('SETTINGS_STORE_GET_ALL_CANCEL');
  yield cancel(bgGetAllSettings);
}

/* ***************************** updateMainSettings ********************** */
function* updateMainSettings(action) {
  yield put(actions.settingsStoreSetSection({
    updatingMainSettings: true,
  }));
  try {
    yield call(api.updateMainSettings, action.value);
    yield put(actions.settingsStoreSetSection({
      updatingMainSettings: false,
    }));
    yield setSuccessToast('Основные настройки успешно сохранены');
  } catch (e) {
    yield put(actions.settingsStoreSetSection({
      updatingMainSettings: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledUpdateMainSettings(action) {
  const bgUpdateMainSettings = yield fork(updateMainSettings, action);
  yield take('SETTINGS_STORE_UPDATE_MAIN_CANCEL');
  yield cancel(bgUpdateMainSettings);
}

/* ***************************** updateRecallSettings ********************** */
function* updateRecallSettings(action) {
  yield put(actions.settingsStoreSetSection({
    updatingRecallSettings: true,
  }));
  try {
    yield call(api.updateRecallSettings, action.value);
    yield put(actions.settingsStoreSetSection({
      updatingRecallSettings: false,
    }));
    yield setSuccessToast('Настройки перезвона успешно сохранены');
  } catch (e) {
    yield put(actions.settingsStoreSetSection({
      updatingRecallSettings: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledUpdateRecallSettings(action) {
  const bgUpdateRecallSettings = yield fork(updateRecallSettings, action);
  yield take('SETTINGS_STORE_UPDATE_RECALL_CANCEL');
  yield cancel(bgUpdateRecallSettings);
}

/* ***************************** updateTimeZoneSettings ********************** */
function* updateTimeZoneSettings(action) {
  yield put(actions.settingsStoreSetSection({
    updatingTimeZoneSettings: true,
  }));
  try {
    yield call(api.updateTimeZoneSettings, action.value);
    yield put(actions.settingsStoreSetSection({
      updatingTimeZoneSettings: false,
    }));
    yield setSuccessToast('Настройки часовых поясов успешно сохранены');
  } catch (e) {
    yield put(actions.settingsStoreSetSection({
      updatingTimeZoneSettings: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledUpdateTimeZoneSettings(action) {
  const bgUpdateTimeZoneSettings = yield fork(updateTimeZoneSettings, action);
  yield take('SETTINGS_STORE_UPDATE_TIME_ZONE_CANCEL');
  yield cancel(bgUpdateTimeZoneSettings);
}

/* ***************************** updateQueuePhoneSettings ********************** */
function* updateQueuePhoneSettings(action) {
  try {
    yield call(api.updateQueuePhoneSettings, action.value);
    yield put(actions.settingsStoreChangeQueuePhoneItem(action.value));
    yield setSuccessToast('Изменения успешно сохранены');
  } catch (e) {
    yield getError(e);
  }
}

export function* canBeCanceledUpdateQueuePhoneSettings(action) {
  const bgUpdateQueuePhoneSettings = yield fork(updateQueuePhoneSettings, action);
  yield take('SETTINGS_STORE_UPDATE_QUEUE_PHONE_CANCEL');
  yield cancel(bgUpdateQueuePhoneSettings);
}
