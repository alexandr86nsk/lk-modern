import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** zoneStoreGetZones ********************** */
function* zoneStoreGetZones() {
  yield put(actions.zoneStoreSetSection({
    zonesLoading: true,
  }));
  yield queryResultAnalysis(
    api.zoneStoreGetZones,
    null,
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        zones: res && Array.isArray(res) && res.map((v) => {
          const {
            id,
            regionTypeShort,
            regionName,
          } = v || {};
          return {
            value: id,
            label: `${regionTypeShort ? `${regionTypeShort} ` : ''}${regionName || 'Неизвестное'}`,
          };
        }),
        zonesLoading: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        zones: [],
        zonesLoading: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetZones() {
  const bgZoneStoreGetZones = yield fork(zoneStoreGetZones);
  yield take('SETTINGS_STORE_GET_ZONES_CANCEL');
  yield cancel(bgZoneStoreGetZones);
}

/* ***************************** zoneStoreGetZoneInfo ********************** */
function* zoneStoreGetZoneInfo(value) {
  yield put(actions.zoneStoreSetSection({
    zoneInfoLoading: true,
    zoneInfo: undefined,
  }));
  yield queryResultAnalysis(
    api.zoneStoreGetZoneInfo,
    value,
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        zoneInfo: res,
        zoneInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        zoneInfo: undefined,
        zoneInfoLoading: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetZoneInfo(action) {
  const bgZoneStoreGetZoneInfo = yield fork(zoneStoreGetZoneInfo, action.value);
  yield take('SETTINGS_STORE_GET_ZONE_INFO_CANCEL');
  yield cancel(bgZoneStoreGetZoneInfo);
}

/* ***************************** zoneStoreGetUsers ********************** */
function* zoneStoreGetUsers(value) {
  const userRole = {
    zoneUsers: 'SUPERVISOR',
    subZoneUsers: 'FINANCIAL_CONSULTANT',
  };
  yield put(actions.zoneStoreSetSection({
    zoneUsersLoading: true,
  }));
  yield queryResultAnalysis(
    api.zoneStoreGetUsers,
    userRole[value],
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        [value]: res && Array.isArray(res) && res.map((v) => {
          const {
            userID,
            fio,
            phone,
          } = v || {};
          return {
            value: userID,
            label: `${fio || ''}${phone ? ` тел. ${phone}` : ''}`,
          };
        }),
        [`${value}Loading`]: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        [value]: undefined,
        [`${value}Loading`]: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetUsers(action) {
  const bgZoneStoreGetUsers = yield fork(zoneStoreGetUsers, action.value);
  yield take('SETTINGS_STORE_GET_USERS_CANCEL');
  yield cancel(bgZoneStoreGetUsers);
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
      yield (setSuccessToast(`Зона ${(value.id || value.id === 0) ? 'сохранена' : 'добавлена'}.`));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        trySaveZone: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreSaveZone(action) {
  const bgZoneStoreSaveZone = yield fork(zoneStoreSaveZone, action.value);
  yield take('SETTINGS_STORE_SAVE_ZONE_CANCEL');
  yield cancel(bgZoneStoreSaveZone);
}

/* ***************************** zoneStoreAddZoneUser ********************** */
function* zoneStoreAddZoneUser(value) {
  const {
    zoneID,
  } = value || {};
  yield put(actions.zoneStoreSetSection({
    tryAddZoneUser: true,
  }));
  yield queryResultAnalysis(
    api.zoneStoreAddZoneUser,
    value,
    function* () {
      yield put(actions.zoneStoreSetSection({
        tryAddZoneUser: false,
      }));
      yield (setSuccessToast('Пользователь назначен.'));
      yield zoneStoreGetZoneInfo(zoneID);
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        tryAddZoneUser: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreAddZoneUser(action) {
  const bgZoneStoreAddZoneUser = yield fork(zoneStoreAddZoneUser, action.value);
  yield take('SETTINGS_STORE_ADD_ZONE_USER_CANCEL');
  yield cancel(bgZoneStoreAddZoneUser);
}

/* ***************************** zoneStoreRemoveZoneUser ********************** */
function* zoneStoreRemoveZoneUser(value) {
  const {
    zoneID,
  } = value || {};
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Открепляем пользователя',
  }));
  yield queryResultAnalysis(
    api.zoneStoreRemoveZoneUser,
    value,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield (setSuccessToast('Пользователь откреплен.'));
      yield zoneStoreGetZoneInfo(zoneID);
    },
    function* () {
      yield put(actions.modalStoreSetSection({
        loading: false,
        loadingText: '',
      }));
    },
  );
}

export function* canBeCanceledZoneStoreRemoveZoneUser(action) {
  const bgZoneStoreRemoveZoneUser = yield fork(zoneStoreRemoveZoneUser, action.value);
  yield take('SETTINGS_STORE_REMOVE_ZONE_USER_CANCEL');
  yield cancel(bgZoneStoreRemoveZoneUser);
}
