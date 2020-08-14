import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** zoneStoreGetZones ********************** */
function* zoneStoreGetZones(value) {
  const {
    key,
    zoneId,
  } = value || {};
  const isZone = key === 'zone';
  yield put(actions.zoneStoreSetSection({
    [`${key}sLoading`]: true,
  }));
  yield queryResultAnalysis(
    isZone ? api.zoneStoreGetZones : api.zoneStoreGetSubZones,
    isZone ? null : zoneId,
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        [`${key}s`]: res && Array.isArray(res) && res.map((v) => {
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
        [`${key}sLoading`]: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        [`${key}s`]: undefined,
        [`${key}sLoading`]: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetZones(action) {
  const bgZoneStoreGetZones = yield fork(zoneStoreGetZones, action.value);
  yield take('SETTINGS_STORE_GET_ZONES_CANCEL');
  yield cancel(bgZoneStoreGetZones);
}

/* ***************************** zoneStoreGetZoneInfo ********************** */
function* zoneStoreGetZoneInfo(value) {
  const {
    key,
    id,
  } = value || {};
  const isZone = key === 'zone';
  yield put(actions.zoneStoreSetSection({
    [`${key}InfoLoading`]: true,
    [`${key}Info`]: undefined,
  }));
  yield queryResultAnalysis(
    isZone ? api.zoneStoreGetZoneInfo : api.zoneStoreGetSubZoneInfo,
    id,
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        [`${key}Info`]: res,
        [`${key}InfoLoading`]: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        [`${key}Info`]: undefined,
        [`${key}InfoLoading`]: false,
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
  const usersVariable = {
    zone: 'usersForZone',
    subZone: 'usersForSubZone',
  };
  const {
    key,
  } = value || {};
  const isZone = key === 'zone';
  yield put(actions.zoneStoreSetSection({
    [`${usersVariable[key]}Loading`]: true,
  }));
  yield queryResultAnalysis(
    api.zoneStoreGetUsers,
    isZone ? 'SUPERVISOR' : 'FINANCIAL_CONSULTANT',
    function* (res) {
      yield put(actions.zoneStoreSetSection({
        [usersVariable[key]]: res,
        [`${usersVariable[key]}Loading`]: false,
      }));
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        [usersVariable[key]]: undefined,
        [`${usersVariable[key]}Loading`]: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreGetUsers(action) {
  const bgZoneStoreGetUsers = yield fork(zoneStoreGetUsers, action.value);
  yield take('SETTINGS_STORE_GET_USERS_CANCEL');
  yield cancel(bgZoneStoreGetUsers);
}

/* ***************************** zoneStoreAddZoneUser ********************** */
function* zoneStoreAddZoneUser(value) {
  const {
    key,
    id,
    users,
  } = value || {};
  const isZone = key === 'zone';
  const variables = {
    zone: 'tryAddZoneUser',
    subZone: 'tryAddSubZoneUser',
  };
  const selectedVariables = {
    zone: 'selectedUserForZone',
    subZone: 'selectedUserForSubZone',
  };
  yield put(actions.zoneStoreSetSection({
    [variables[key]]: true,
  }));
  yield queryResultAnalysis(
    isZone ? api.zoneStoreAddZoneUser : api.zoneStoreAddSubZoneUser,
    isZone ? { zoneID: id, users } : { subZoneID: id, users },
    function* () {
      yield put(actions.zoneStoreSetSection({
        [variables[key]]: false,
        [selectedVariables[key]]: undefined,
      }));
      yield (setSuccessToast('Пользователь назначен.'));
      yield zoneStoreGetZoneInfo({
        key,
        id,
      });
    },
    function* () {
      yield put(actions.zoneStoreSetSection({
        [variables[key]]: false,
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
    key,
    id,
    users,
  } = value || {};
  const isZone = key === 'zone';
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Открепляем пользователя',
  }));
  yield queryResultAnalysis(
    isZone ? api.zoneStoreAddZoneUser : api.zoneStoreAddSubZoneUser,
    isZone ? { zoneID: id, users } : { subZoneID: id, users },
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield (setSuccessToast('Пользователь откреплен.'));
      yield zoneStoreGetZoneInfo({
        key,
        id,
      });
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
