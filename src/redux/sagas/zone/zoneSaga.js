import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** zoneStoreGetZones ********************** */
function* zoneStoreGetZones() {
  yield put(actions.zoneStoreSetZonesTableStoreSection({
    tableLoading: true,
  }));
  yield queryResultAnalysis(
    api.zoneStoreGetZones,
    null,
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        Zones: res,
      }));
      yield put(actions.zoneStoreSetZonesTableStoreSection({
        tableLoading: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        Zones: [],
      }));
      yield put(actions.zoneStoreSetZonesTableStoreSection({
        tableLoading: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetZones() {
  const bgzoneStoreGetZones = yield fork(zoneStoreGetZones);
  yield take('SETTINGS_STORE_GET_ZONES_CANCEL');
  yield cancel(bgzoneStoreGetZones);
}

/* ***************************** zoneStoreGetZoneInfo ********************** */
function* zoneStoreGetZoneInfo(value) {
  yield put(actions.zoneStoreSetSection({
    ZoneInfoLoading: true,
  }));
  yield queryResultAnalysis(
    api.zoneStoreGetZoneInfo,
    value,
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        ZoneInfo: res,
        ZoneInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        ZoneInfo: {},
        ZoneInfoLoading: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetZoneInfo(action) {
  const bgzoneStoreGetZoneInfo = yield fork(zoneStoreGetZoneInfo, action.value);
  yield take('SETTINGS_STORE_GET_ZONE_INFO_CANCEL');
  yield cancel(bgzoneStoreGetZoneInfo);
}

/* ***************************** zoneStoreSaveZone ********************** */
function* zoneStoreSaveZone(value) {
  yield put(actions.zoneStoreSetSection({
    trySaveZone: true,
  }));
  yield queryResultAnalysis(
    (value.id || value.id === 0) ? api.zoneStoreSaveZone : api.zoneStoreAddZone,
    value,
    function* () {
      yield put(actions.zoneStoreSetSection({
        trySaveZone: false,
      }));
      yield (setSuccessToast(`Пользователь ${(value.id || value.id === 0) ? 'сохранен' : 'добавлен'}.`));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        trySaveZone: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreSaveZone(action) {
  const bgzoneStoreSaveZone = yield fork(zoneStoreSaveZone, action.value);
  yield take('SETTINGS_STORE_SAVE_ZONE_CANCEL');
  yield cancel(bgzoneStoreSaveZone);
}

/* ***************************** zoneStoreRemoveZone ********************** */
function* zoneStoreRemoveZone(value) {
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Удаляем пользователя...',
  }));
  yield queryResultAnalysis(
    api.zoneStoreRemoveZone,
    value,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield (setSuccessToast('Пользователь удален.'));
    },
    function* () {
      yield put(actions.modalStoreSetSection({
        loading: false,
        loadingText: '',
      }));
    },
  );
}

export function* canBeCanceledZoneStoreRemoveZone(action) {
  const bgzoneStoreRemoveZone = yield fork(zoneStoreRemoveZone, action.value);
  yield take('SETTINGS_STORE_REMOVE_ZONE_CANCEL');
  yield cancel(bgzoneStoreRemoveZone);
}
