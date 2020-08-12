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
    undefined,
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
      yield setSuccessToast('Настройки сохранены.');
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
function* settingsStoreGetUsers(value) {
  yield put(actions.settingsStoreSetUsersTableStoreSection({
    tableLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetUsers,
    value,
    function* (res) {
      const {
        users,
        usersTotal,
      } = res || {};
      yield put(actions.settingsStoreSetSection({
        users,
      }));
      yield put(actions.settingsStoreSetUsersTableStoreSection({
        paginationTotalItems: usersTotal,
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

export function* canBeCanceledSettingsStoreGetUsers(action) {
  const bgSettingsStoreGetUsers = yield fork(settingsStoreGetUsers, action.value);
  yield take('SETTINGS_STORE_GET_USERS_CANCEL');
  yield cancel(bgSettingsStoreGetUsers);
}

/* ***************************** settingsStoreGetUserRoles ********************** */
function* settingsStoreGetUserRoles(value) {
  yield put(actions.settingsStoreSetSection({
    userRolesLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetUserRoles,
    value,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        userRoles: res && Array.isArray(res) && res.map((v) => {
          const {
            description,
            id,
          } = v || {};
          return {
            value: id,
            label: description,
          };
        }),
        userRolesLoading: false,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        userRoles: undefined,
        userRolesLoading: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetUserRoles(action) {
  const bgSettingsStoreGetUserRoles = yield fork(settingsStoreGetUserRoles, action.value);
  yield take('SETTINGS_STORE_GET_USER_ROLES_CANCEL');
  yield cancel(bgSettingsStoreGetUserRoles);
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

/* ***************************** settingsStoreSaveUser ********************** */
function* settingsStoreSaveUser(value) {
  yield put(actions.settingsStoreSetSection({
    trySaveUser: true,
  }));
  yield queryResultAnalysis(
    (value.id || value.id === 0) ? api.settingsStoreSaveUser : api.settingsStoreAddUser,
    value,
    function* () {
      yield put(actions.popUpStoreClear());
      yield put(actions.settingsStoreSetSection({
        trySaveUser: false,
      }));
      yield (setSuccessToast(`Пользователь ${(value.id || value.id === 0) ? 'сохранен' : 'добавлен'}.`));
      yield settingsStoreGetUsers();
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        trySaveUser: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreSaveUser(action) {
  const bgSettingsStoreSaveUser = yield fork(settingsStoreSaveUser, action.value);
  yield take('SETTINGS_STORE_SAVE_USER_CANCEL');
  yield cancel(bgSettingsStoreSaveUser);
}

/* ***************************** settingsStoreRemoveUser ********************** */
function* settingsStoreRemoveUser(value) {
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Удаляем пользователя...',
  }));
  yield queryResultAnalysis(
    api.settingsStoreRemoveUser,
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

export function* canBeCanceledSettingsStoreRemoveUser(action) {
  const bgSettingsStoreRemoveUser = yield fork(settingsStoreRemoveUser, action.value);
  yield take('SETTINGS_STORE_REMOVE_USER_CANCEL');
  yield cancel(bgSettingsStoreRemoveUser);
}

/* ***************************** settingsStoreGetTemplates ********************** */
function* settingsStoreGetTemplates() {
  yield put(actions.settingsStoreSetTemplatesTableStoreSection({
    tableLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetTemplates,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        templates: res,
      }));
      yield put(actions.settingsStoreSetTemplatesTableStoreSection({
        tableLoading: false,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        templates: [],
      }));
      yield put(actions.settingsStoreSetTemplatesTableStoreSection({
        tableLoading: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetTemplates() {
  const bgSettingsStoreGetTemplates = yield fork(settingsStoreGetTemplates);
  yield take('SETTINGS_STORE_GET_TEMPLATES_CANCEL');
  yield cancel(bgSettingsStoreGetTemplates);
}

/* ***************************** settingsStoreGetTemplateInfo ********************** */
function* settingsStoreGetTemplateInfo(value) {
  yield put(actions.settingsStoreSetSection({
    templateInfoLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetTemplateInfo,
    value,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        templateInfo: res,
        templateInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        templateInfo: {},
        templateInfoLoading: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetTemplateInfo(action) {
  const bgSettingsStoreGetTemplateInfo = yield fork(settingsStoreGetTemplateInfo, action.value);
  yield take('SETTINGS_STORE_GET_TEMPLATE_INFO_CANCEL');
  yield cancel(bgSettingsStoreGetTemplateInfo);
}

/* ***************************** settingsStoreSaveTemplate ********************** */
function* settingsStoreSaveTemplate(value) {
  yield put(actions.settingsStoreSetSection({
    trySaveTemplate: true,
  }));
  yield queryResultAnalysis(
    (value.id || value.id === 0) ? api.settingsStoreSaveTemplate : api.settingsStoreAddTemplate,
    value,
    function* () {
      yield put(actions.settingsStoreSetSection({
        trySaveTemplate: false,
      }));
      yield (setSuccessToast(`Шаблон ${(value.id || value.id === 0) ? 'сохранен' : 'добавлен'}.`));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        trySaveTemplate: false,
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreSaveTemplate(action) {
  const bgSettingsStoreSaveTemplate = yield fork(settingsStoreSaveTemplate, action.value);
  yield take('SETTINGS_STORE_SAVE_TEMPLATE_CANCEL');
  yield cancel(bgSettingsStoreSaveTemplate);
}

/* ***************************** settingsStoreRemoveTemplate ********************** */
function* settingsStoreRemoveTemplate(value) {
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Удаляем шаблон...',
  }));
  yield queryResultAnalysis(
    api.settingsStoreRemoveTemplate,
    value,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield (setSuccessToast('Шаблон удален.'));
    },
    function* () {
      yield put(actions.modalStoreSetSection({
        loading: false,
        loadingText: '',
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreRemoveTemplate(action) {
  const bgSettingsStoreRemoveTemplate = yield fork(settingsStoreRemoveTemplate, action.value);
  yield take('SETTINGS_STORE_REMOVE_TEMPLATE_CANCEL');
  yield cancel(bgSettingsStoreRemoveTemplate);
}

/* ***************************** settingsStoreGetTemplateVar ********************** */
function* settingsStoreGetTemplateVar() {
  yield put(actions.settingsStoreSetSection({
    trySaveTemplate: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetTemplateVar,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        templateVar: res,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        templateVar: [],
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreGetTemplateVar() {
  const bgSettingsStoreGetTemplateVar = yield fork(settingsStoreGetTemplateVar);
  yield take('SETTINGS_STORE_GET_TEMPLATE_VAR_CANCEL');
  yield cancel(bgSettingsStoreGetTemplateVar);
}

/* ***************************** settingsStoreDadataGetAddress ********************** */
function* settingsStoreDadataGetAddress(value) {
  const {
    id,
    query,
  } = value || {};
  // const setStoreFn = actions[`settingsStoreSetA${id.slice(1)}`];
  yield put(actions.settingsStoreSetSection({
    [`${id}Loading`]: true,
  }));
  yield queryResultAnalysis(
    api.dadataGetAddress,
    query,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        [`${id}Loading`]: false,
        [`${id}Results`]: res.suggestions,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        [`${id}Loading`]: false,
        [`${id}Results`]: [],
      }));
    },
  );
}

export function* canBeCanceledSettingsStoreDadataGetAddress(action) {
  const bgSettingsStoreDadataGetAddress = yield fork(settingsStoreDadataGetAddress, action.value);
  yield take('SETTINGS_STORE_DADATA_GET_ADDRESS_CANCEL');
  yield cancel(bgSettingsStoreDadataGetAddress);
}
