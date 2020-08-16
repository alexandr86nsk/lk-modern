import {
  put, fork, take, cancel,
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
        [`${key}s`]: res,
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
  yield take('ZONE_STORE_GET_ZONES_CANCEL');
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
  yield take('ZONE_STORE_GET_ZONE_INFO_CANCEL');
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
  yield take('ZONE_STORE_GET_USERS_CANCEL');
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
  yield take('ZONE_STORE_ADD_ZONE_USER_CANCEL');
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
  yield take('ZONE_STORE_REMOVE_ZONE_USER_CANCEL');
  yield cancel(bgZoneStoreRemoveZoneUser);
}

/* ***************************** zoneStoreSaveZone ********************** */
function* zoneStoreSaveZone(value) {
  yield put(actions.popUpStoreSetSection({
    trySaveZone: true,
  }));
  const {
    key,
    zoneId,
    el,
    subZoneId,
  } = value || {};
  const {
    id,
  } = el || {};
  const isZone = key === 'zone';
  const saveZoneMethod = (id || id === 0) ? api.zoneStoreSaveZone : api.zoneStoreAddZone;
  const saveSubZoneMethod = (id || id === 0) ? api.zoneStoreSaveSubZone : api.zoneStoreAddSubZone;
  const sendData = (id || id === 0) ? el : { ...el, zoneAppID: zoneId };
  yield queryResultAnalysis(
    isZone ? saveZoneMethod : saveSubZoneMethod,
    sendData,
    function* () {
      yield put(actions.popUpStoreSetSection({
        trySaveZone: false,
      }));
      yield put(actions.popUpStoreClear());
      yield (setSuccessToast(`${isZone ? 'Зона' : 'Подзона'} ${(id || id === 0) ? 'сохранена' : 'добавлена'}.`));
      yield (id || id === 0)
        ? zoneStoreGetZoneInfo({ key, id })
        : zoneStoreGetZones({ key, zoneId });
      if (subZoneId || subZoneId === 0) {
        yield zoneStoreGetZoneInfo({ key: 'subZone', id: subZoneId });
      }
    },
    function* () {
      yield put(actions.popUpStoreSetSection({
        trySaveZone: false,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreSaveZone(action) {
  const bgZoneStoreSaveZone = yield fork(zoneStoreSaveZone, action.value);
  yield take('ZONE_STORE_SAVE_ZONE_CANCEL');
  yield cancel(bgZoneStoreSaveZone);
}

/* ***************************** zoneStoreRemoveZone ********************** */
function* zoneStoreRemoveZone(value) {
  const {
    key,
    zoneId,
    subZoneId,
  } = value || {};
  const isZone = key === 'zone';
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: `Удаляем ${isZone ? 'зону' : 'подзону'}`,
  }));
  yield queryResultAnalysis(
    isZone ? api.zoneStoreRemoveZone : api.zoneStoreRemoveSubZone,
    isZone ? zoneId : subZoneId,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      if (isZone) {
        yield put(actions.zoneStoreSetSection({
          zoneInfo: undefined,
          selectedZone: undefined,
          selectedSubZone: undefined,
          selectedUserForZone: undefined,
        }));
        yield zoneStoreGetZones({
          key: 'zone',
        });
      } else {
        yield put(actions.zoneStoreSetSection({
          subZoneInfo: undefined,
          selectedSubZone: undefined,
          selectedUserForSubZone: undefined,
        }));
        yield zoneStoreGetZones({
          key: 'subZone',
          zoneId,
        });
      }
      yield (setSuccessToast(`${isZone ? 'Зона' : 'Подзона'} удалена.`));
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
  const bgZoneStoreRemoveZone = yield fork(zoneStoreRemoveZone, action.value);
  yield take('ZONE_STORE_REMOVE_ZONE_CANCEL');
  yield cancel(bgZoneStoreRemoveZone);
}

/* ***************************** zoneStoreDadataGetAddress ********************** */
function* zoneStoreDadataGetAddress(value) {
  yield put(actions.popUpStoreSetSection({
    zonesSearchResultsLoading: true,
  }));
  yield queryResultAnalysis(
    api.dadataGetAddress,
    value,
    function* (res) {
      yield put(actions.popUpStoreSetSection({
        zonesSearchResultsLoading: false,
        zonesSearchResults: res.suggestions,
      }));
    },
    function* () {
      yield put(actions.popUpStoreSetSection({
        zonesSearchResultsLoading: false,
        zonesSearchResults: undefined,
      }));
    },
  );
}

export function* canBeCanceledZoneStoreDadataGetAddress(action) {
  const bgZoneStoreDadataGetAddress = yield fork(zoneStoreDadataGetAddress, action.value);
  yield take('ZONE_STORE_DADATA_GET_ADDRESS_CANCEL');
  yield cancel(bgZoneStoreDadataGetAddress);
}
