import {
  put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** getBriefcases ********************** */
function* getBriefcases() {
  yield put(actions.briefcasesStoreSetTableStoreSection({
    tableLoading: true,
  }));
  yield queryResultAnalysis(
    api.getQueueAsteriskList,
    undefined,
    function* (res) {
      yield put(actions.briefcasesStoreSetSection({
        briefcases: res,
      }));
      yield put(actions.briefcasesStoreSetTableStoreSection({
        tableLoading: false,
      }));
    },
    function* () {
      yield put(actions.briefcasesStoreSetTableStoreSection({
        tableLoading: false,
      }));
    },
  );
}

export function* canBeCanceledBriefcasesStoreGetBriefcases() {
  const bgGetBriefcases = yield fork(getBriefcases);
  yield take('BRIEFCASES_STORE_GET_BRIEFCASES_CANCEL');
  yield cancel(bgGetBriefcases);
}

/* ***************************** getMainSettings ********************** */
function* getMainSettings(value) {
  yield put(actions.briefcasesStoreSetSection({
    loadingQueueMainSettings: true,
  }));
  yield queryResultAnalysis(
    api.getQueueAsteriskSettings,
    value,
    function* (res) {
      yield put(actions.briefcasesStoreSetSection({
        queueMainSettings: res,
        loadingQueueControlTypes: true,
        loadingQueueMainSettings: false,
      }));
      yield queryResultAnalysis(
        api.getQueueAsteriskControlTypes,
        undefined,
        function* (result) {
          yield put(actions.briefcasesStoreSetSection({
            queueControlTypes: result && Array.isArray(result) && result.map((v) => ({
              value: v.Id,
              label: v.Name,
            })),
            loadingQueueControlTypes: false,
          }));
        },
        function* () {
          yield put(actions.briefcasesStoreSetSection({
            queueControlTypes: undefined,
            loadingQueueMainSettings: false,
          }));
        },
      );
    },
    function* () {
      yield put(actions.briefcasesStoreSetSection({
        queueMainSettings: undefined,
        loadingQueueMainSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetMainSettings(action) {
  const bgGetMainSettings = yield fork(getMainSettings, action.value);
  yield take('BRIEFCASES_STORE_GET_MAIN_SETTINGS_CANCEL');
  yield cancel(bgGetMainSettings);
}

/* ***************************** getRecallSettings ********************** */
function* getRecallSettings(value) {
  yield put(actions.briefcasesStoreSetSection({
    loadingQueueRecallSettings: true,
  }));
  yield queryResultAnalysis(
    api.getQueueAsteriskRetryRulesSettings,
    value,
    function* (res) {
      yield put(actions.briefcasesStoreSetSection({
        queueRecallSettings: res,
        loadingQueueRecallSettings: false,
      }));
    },
    function* () {
      yield put(actions.briefcasesStoreSetSection({
        queueRecallSettings: undefined,
        loadingQueueRecallSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetRecallSettings(action) {
  const bgGetRecallSettings = yield fork(getRecallSettings, action.value);
  yield take('BRIEFCASES_STORE_GET_RECALL_SETTINGS_CANCEL');
  yield cancel(bgGetRecallSettings);
}

/* ***************************** getTimeZoneSettings ********************** */
function* getTimeZoneSettings(value) {
  yield put(actions.briefcasesStoreSetSection({
    loadingQueueTimeZoneSettings: true,
  }));
  yield queryResultAnalysis(
    api.getQueueAsteriskTimeZoneSettings,
    value,
    function* (res) {
      yield put(actions.briefcasesStoreSetSection({
        queueTimeZoneSettings: res,
        loadingQueueTimeZoneSettings: false,
      }));
    },
    function* () {
      yield put(actions.briefcasesStoreSetSection({
        queueTimeZoneSettings: undefined,
        loadingQueueTimeZoneSettings: false,
      }));
    },
  );
}

export function* canBeCanceledGetTimeZoneSettings(action) {
  const bgGetTimeZoneSettings = yield fork(getTimeZoneSettings, action.value);
  yield take('BRIEFCASES_STORE_GET_TIME_ZONE_SETTINGS_CANCEL');
  yield cancel(bgGetTimeZoneSettings);
}

/* ***************************** saveMainSettings ********************** */
function* saveMainSettings(value) {
  const { QueuePhone } = value || {};
  yield put(actions.briefcasesStoreSetSection({
    trySaveQueueMainSettings: true,
  }));
  yield queryResultAnalysis(
    api.saveQueueAsteriskSettings,
    value,
    function* () {
      yield put(actions.briefcasesStoreSetSection({
        trySaveQueueMainSettings: false,
      }));
      yield setSuccessToast('Основные настройки сохранены.');
      yield getMainSettings(QueuePhone);
    },
    function* () {
      yield put(actions.briefcasesStoreSetSection({
        trySaveQueueMainSettings: false,
      }));
    },
  );
}

export function* canBeCanceledSaveMainSettings(action) {
  const bgSaveMainSettings = yield fork(saveMainSettings, action.value);
  yield take('BRIEFCASE_STORE_SAVE_MAIN_SETTINGS_CANCEL');
  yield cancel(bgSaveMainSettings);
}

/* /!* ***************************** getQueueAsteriskOptions ********************** *!/
function* getQueueAsteriskOptions() {
  yield put(actions.briefcaseListStoreSetSection({
    queueAsteriskOptionsLoading: true,
  }));
  try {
    const options = yield call(api.getQueueAsteriskOptions);
    yield put(actions.briefcaseListStoreSetSection({
      queueAsteriskOptions: options.data.map((v) => ({
        value: v.QueuePhone,
        label: v.QueuePhone,
      })),
      queueAsteriskOptionsLoading: false,
    }));
  } catch (e) {
    yield put(actions.briefcaseListStoreSetSection({
      queueAsteriskOptionsLoading: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetQueueAsteriskOptions() {
  const bgGetQueueAsteriskOptions = yield fork(getQueueAsteriskOptions);
  yield take('BRIEFCASE_STORE_GET_QUEUE_ASTERISK_OPTIONS_CANCEL');
  yield cancel(bgGetQueueAsteriskOptions);
} */

/* ***************************** saveQueueAsteriskRecallSettings ********************** */
/* function* saveQueueAsteriskRecallSettings(value) {
  yield put(actions.briefcaseListStoreSetSection({
    trySaveQueueAsteriskRetryRulesSettings: true,
  }));
  try {
    yield call(api.saveQueueAsteriskRecallSettings, value);
    yield put(actions.briefcaseListStoreSetSection({
      trySaveQueueAsteriskRetryRulesSettings: false,
    }));
    yield setSuccessToast('Настройки успешно сохранены');
  } catch (e) {
    yield put(actions.briefcaseListStoreSetSection({
      trySaveQueueAsteriskRetryRulesSettings: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledSaveQueueAsteriskRecallSettings(action) {
  const bgSaveQueueAsteriskRecallSettings = yield fork(saveQueueAsteriskRecallSettings, action.value);
  yield take('BRIEFCASE_STORE_SAVE_RECALL_SETTINGS_CANCEL');
  yield cancel(bgSaveQueueAsteriskRecallSettings);
}

/!* ***************************** saveQueueAsteriskTimeZoneSettings ********************** *!/
function* saveQueueAsteriskTimeZoneSettings(value) {
  yield put(actions.briefcaseListStoreSetSection({
    trySaveQueueAsteriskTimeZoneSettings: true,
  }));
  try {
    yield call(api.saveQueueAsteriskTimeZoneSettings, value);
    yield put(actions.briefcaseListStoreSetSection({
      trySaveQueueAsteriskTimeZoneSettings: false,
    }));
    yield setSuccessToast('Настройки успешно сохранены');
  } catch (e) {
    yield put(actions.briefcaseListStoreSetSection({
      trySaveQueueAsteriskTimeZoneSettings: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledSaveQueueAsteriskTimeZoneSettings(action) {
  const bgSaveQueueAsteriskTimeZoneSettings = yield fork(saveQueueAsteriskTimeZoneSettings, action.value);
  yield take('BRIEFCASE_STORE_SAVE_TIME_ZONE_SETTINGS_CANCEL');
  yield cancel(bgSaveQueueAsteriskTimeZoneSettings);
}

/!* ***************************** saveQueueAsteriskTimeZoneSettings ********************** *!/
function* saveQueueAsteriskSettings(value) {
  yield put(actions.briefcaseListStoreSetSection({
    trySaveQueueAsteriskSettings: true,
  }));
  try {
    yield call(api.saveQueueAsteriskSettings, value);
    yield put(actions.briefcaseListStoreSetSection({
      trySaveQueueAsteriskSettings: false,
    }));
    yield setSuccessToast('Настройки успешно сохранены');
  } catch (e) {
    yield put(actions.briefcaseListStoreSetSection({
      trySaveQueueAsteriskSettings: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledSaveQueueAsteriskSettings(action) {
  const bgSaveQueueAsteriskSettings = yield fork(saveQueueAsteriskSettings, action.value);
  yield take('BRIEFCASE_STORE_SAVE_QUEUE_ASTERISK_SETTINGS_CANCEL');
  yield cancel(bgSaveQueueAsteriskSettings);
}

/!* ***************************** updateBriefcase ********************** *!/
function* updateBriefcase(action) {
  try {
    yield call(api.updateBriefCase, action.value);
  } catch (e) {
    yield getError(e);
  }
}

export function* canBeCanceledUpdateBriefcase(action) {
  const bgUpdateBriefcase = yield fork(updateBriefcase, action);
  yield take('BRIEFCASE_STORE_UPDATE_BRIEFCASE_CANCEL');
  yield cancel(bgUpdateBriefcase);
}

/!* ***************************** startBriefcase ********************** *!/
function* startBriefcase(action) {
  try {
    yield call(api.startBriefCase, action.id);
    yield getBriefcaseList();
    yield setSuccessToast('Кампания успешно запущена');
  } catch (e) {
    yield getError(e);
  }
}

export function* canBeCanceledStartBriefcase(action) {
  const bgStartBriefcase = yield fork(startBriefcase, action);
  yield take('BRIEFCASE_STORE_START_BRIEFCASE_CANCEL');
  yield cancel(bgStartBriefcase);
}

/!* ***************************** stopBriefcase ********************** *!/
function* stopBriefcase(action) {
  try {
    yield call(api.stopBriefCase, action.id);
    yield getBriefcaseList();
    yield setSuccessToast('Кампания успешно остановлена');
  } catch (e) {
    yield getError(e);
  }
}

export function* canBeCanceledStopBriefcase(action) {
  const bgStopBriefcase = yield fork(stopBriefcase, action);
  yield take('BRIEFCASE_STORE_STOP_BRIEFCASE_CANCEL');
  yield cancel(bgStopBriefcase);
}

/!* ***************************** addBriefcase ********************** *!/
function* addBriefcase(action) {
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Добавляем Кампанию',
  }));
  try {
    yield call(api.addBriefCase, action.value);
    yield put(actions.modalStoreSetSection({
      show: false,
    }));
    yield setSuccessToast('Кампания успешно добавлена');
    yield getBriefcaseList();
  } catch (e) {
    yield put(actions.modalStoreSetSection({
      loading: false,
      loadingText: '',
    }));
    yield getError(e);
  }
}

export function* canBeCanceledAddBriefcase(action) {
  const bgAddBriefcase = yield fork(addBriefcase, action);
  yield take('BRIEFCASE_STORE_ADD_BRIEFCASE_CANCEL');
  yield cancel(bgAddBriefcase);
}

/!* ***************************** deleteBriefcase ********************** *!/
function* deleteBriefcase(action) {
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Удаляем Кампанию',
  }));
  try {
    yield call(api.deleteBriefCase, action.id);
    yield put(actions.modalStoreSetSection({
      show: false,
    }));
    yield setSuccessToast('Кампания успешно удалена');
    yield getBriefcaseList();
  } catch (e) {
    yield put(actions.modalStoreSetSection({
      loading: false,
      loadingText: '',
    }));
    yield getError(e);
  }
}

export function* canBeCanceledDeleteBriefcase(action) {
  const bgDeleteBriefcase = yield fork(deleteBriefcase, action);
  yield take('BRIEFCASE_STORE_DELETE_BRIEFCASE_CANCEL');
  yield cancel(bgDeleteBriefcase);
}

/!* ***************************** updateBriefcaseFile ********************** *!/
function* updateBriefcaseFile(action) {
  try {
    yield call(api.uploadBriefCaseFile, action.id, action.value);
    yield setSuccessToast('Файл успешно загружен');
  } catch (e) {
    yield getError(e);
  }
}

export function* canBeCanceledUpdateBriefcaseFile(action) {
  const bgUpdateBriefcaseFile = yield fork(updateBriefcaseFile, action);
  yield take('BRIEFCASE_STORE_UPDATE_BRIEFCASE_FILE_CANCEL');
  yield cancel(bgUpdateBriefcaseFile);
}

/!* ***************************** getBriefcaseCalls ********************** *!/
function* getBriefcaseCalls(action) {
  yield put(actions.briefcaseItemStoreSetSection({
    tableDataLoaded: false,
  }));
  try {
    const items = yield call(api.getBriefCaseItemCalls, action.id);
    yield put(actions.briefcaseItemStoreSetSection({
      tableDataLoaded: true,
      items: items.data,
    }));
  } catch (e) {
    yield put(actions.briefcaseItemStoreSetSection({
      tableDataLoaded: true,
      items: [],
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetBriefcaseCalls(action) {
  const bgGetBriefcaseCalls = yield fork(getBriefcaseCalls, action);
  yield take('BRIEFCASE_STORE_GET_BRIEFCASE_CALLS_CANCEL');
  yield cancel(bgGetBriefcaseCalls);
}

/!* ***************************** getBriefcase ********************** *!/
function* getBriefcase(action) {
  try {
    const item = yield call(api.getBriefCaseItem, action.id);
    yield getBriefcaseCalls(action);
    yield put(actions.briefcaseItemStoreSetSection({
      dataLoaded: true,
      ...item.data,
    }));
  } catch (e) {
    yield put(actions.briefcaseItemStoreSetSection({
      dataLoaded: true,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetBriefcase(action) {
  const bgGetBriefcase = yield fork(getBriefcase, action);
  yield take('BRIEFCASE_STORE_GET_BRIEFCASE_CANCEL');
  yield cancel(bgGetBriefcase);
} */
