import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setErrorToast, setSuccessToast } from '../common/globalSaga';
import { addressVariables } from '../../../containers/SettingsPage/tabs/UsersTab/settings';

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
  yield put(actions.popUpStoreSetSection({
    userInfoLoading: true,
    userInfo: undefined,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetUserInfo,
    value,
    function* (res) {
      yield put(actions.popUpStoreSetSection({
        userInfo: res,
        userInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.popUpStoreSetSection({
        userInfo: undefined,
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
  yield put(actions.popUpStoreSetSection({
    trySaveUser: true,
  }));
  const {
    el,
    callback,
  } = value || {};
  const {
    userID: id,
    addressRegistration,
    addressResidence,
    isConcidesPlaceReg,
  } = el || {};
  const {
    houseName: addressRegistrationHouseName,
    block: addressRegistrationBlock,
    flat: addressRegistrationFlat,
    cityKladrId: addressRegistrationCityKladrId,
    cityFiasID: addressRegistrationCityFiasId,
    countryIsoCode: addressRegistrationCountryIsoCode,
    regionFiasID: addressRegistrationRegionFiasId,
    streetFiasID: addressRegistrationStreetFiasId,
    regionIsoCode: addressRegistrationRegionIsoCode,
  } = addressRegistration || {};
  const {
    houseName: addressResidenceHouseName,
    block: addressResidenceBlock,
    flat: addressResidenceFlat,
    cityKladrId: addressResidenceCityKladrId,
    cityFiasID: addressResidenceCityFiasId,
    countryIsoCode: addressResidenceCountryIsoCode,
    regionFiasID: addressResidenceRegionFiasId,
    streetFiasID: addressResidenceStreetFiasId,
    regionIsoCode: addressResidenceRegionIsoCode,
  } = addressResidence || {};
  const addressRegistrationQueryString = `${addressRegistrationHouseName
    ? `д ${addressRegistrationHouseName}`
    : ''}${addressRegistrationBlock
    ? ` к ${addressRegistrationBlock}`
    : ''}`;
  const addressRegistrationQuery = {
    from_bound: { value: 'house' },
    locations: [{
      city_fias_id: addressRegistrationCityFiasId,
      country_iso_code: addressRegistrationCountryIsoCode,
      region_fias_id: addressRegistrationRegionFiasId,
      region_iso_code: addressRegistrationRegionIsoCode,
      street_fias_id: addressRegistrationStreetFiasId,
    }],
    locations_boost: [{
      kladr_id: addressRegistrationCityKladrId,
    }],
    query: addressRegistrationQueryString,
    restrict_value: true,
  };
  const addressResidenceQueryString = `${addressResidenceHouseName
    ? `д ${addressResidenceHouseName}`
    : ''}${addressResidenceBlock
    ? ` к ${addressResidenceBlock}`
    : ''}`;
  const addressResidenceQuery = {
    from_bound: { value: 'house' },
    locations: [{
      city_fias_id: addressResidenceCityFiasId,
      country_iso_code: addressResidenceCountryIsoCode,
      region_fias_id: addressResidenceRegionFiasId,
      region_iso_code: addressResidenceRegionIsoCode,
      street_fias_id: addressResidenceStreetFiasId,
    }],
    locations_boost: [{
      kladr_id: addressResidenceCityKladrId,
    }],
    query: addressResidenceQueryString,
    restrict_value: true,
  };
  const replaceObject = ({ dataObj, varString, flat }) => {
    const calcObj = {};
    if (dataObj && dataObj.data && dataObj.data.suggestions
      && Array.isArray(dataObj.data.suggestions)) {
      dataObj.data.suggestions.forEach((x) => {
        const { value: thisValue, data: thisData, unrestricted_value: thisUnValue } = x || {};
        if (thisValue === varString) {
          Object.keys(addressVariables).forEach((v) => {
            if (thisData[v] || thisData[v] === 0) {
              calcObj[addressVariables[v]] = thisData[v];
            }
          });
          calcObj.fullAddress = `${thisUnValue}${flat ? `, ${flat}` : ''}`;
          calcObj.flat = flat;
        }
      });
    }
    return calcObj;
  };
  try {
    const regRes = yield call(api.dadataGetAddress, addressRegistrationQuery);
    const regCalcObj = yield call(replaceObject, {
      dataObj: regRes,
      varString: addressRegistrationQueryString,
      flat: addressRegistrationFlat,
    });
    let resCalcObj = {};
    if (!isConcidesPlaceReg) {
      const resRes = yield call(api.dadataGetAddress, addressResidenceQuery);
      resCalcObj = yield call(replaceObject, {
        dataObj: resRes,
        varString: addressResidenceQueryString,
        flat: addressResidenceFlat,
      });
    }
    yield queryResultAnalysis(
      (id || id === '0') ? api.settingsStoreSaveUser : api.settingsStoreAddUser,
      isConcidesPlaceReg
        ? {
          ...el,
          addressRegistration: { ...addressRegistration, ...regCalcObj },
        }
        : {
          ...el,
          addressRegistration: { ...addressRegistration, ...regCalcObj },
          addressResidence: { ...addressResidence, ...resCalcObj },
        },
      function* () {
        yield put(actions.popUpStoreSetSection({
          trySaveUser: false,
        }));
        yield put(actions.popUpStoreClear());
        yield (setSuccessToast(`Пользователь ${(id || id === 0) ? 'сохранен' : 'добавлен'}.`));
        yield call(callback);
      },
      function* () {
        yield put(actions.popUpStoreSetSection({
          trySaveUser: false,
        }));
      },
    );
  } catch (e) {
    yield (setErrorToast(`Ошибка при ${(id || id === 0) ? 'сохранении' : 'добавлении'} пользователя. Попробуйте обновить страницу.`));
    yield put(actions.popUpStoreSetSection({
      trySaveUser: false,
    }));
  }
}

export function* canBeCanceledSettingsStoreSaveUser(action) {
  const bgSettingsStoreSaveUser = yield fork(settingsStoreSaveUser, action.value);
  yield take('SETTINGS_STORE_SAVE_USER_CANCEL');
  yield cancel(bgSettingsStoreSaveUser);
}

/* ***************************** settingsStoreRemoveUser ********************** */
function* settingsStoreRemoveUser(value) {
  const {
    el,
    callback,
  } = value || {};
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: 'Удаляем пользователя',
  }));
  yield queryResultAnalysis(
    api.settingsStoreRemoveUser,
    el,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield (setSuccessToast('Пользователь удален.'));
      yield call(callback);
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
  yield put(actions.popUpStoreSetSection({
    templateInfoLoading: true,
    templateInfo: undefined,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetTemplateInfo,
    value,
    function* (res) {
      yield put(actions.popUpStoreSetSection({
        templateInfo: res,
        templateInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.popUpStoreSetSection({
        templateInfo: undefined,
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
  const { id } = value || {};
  const isSave = id || id === 0;
  yield put(actions.popUpStoreSetSection({
    trySaveTemplate: true,
  }));
  yield queryResultAnalysis(
    isSave ? api.settingsStoreSaveTemplate : api.settingsStoreAddTemplate,
    value,
    function* () {
      yield put(actions.popUpStoreSetSection({
        trySaveTemplate: false,
      }));
      yield put(actions.popUpStoreClear());
      yield (setSuccessToast(`Шаблон ${isSave ? 'сохранен' : 'добавлен'}.`));
      yield settingsStoreGetTemplates();
    },
    function* () {
      yield put(actions.popUpStoreSetSection({
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
    loadingText: 'Удаляем шаблон',
  }));
  yield queryResultAnalysis(
    api.settingsStoreRemoveTemplate,
    value,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield (setSuccessToast('Шаблон удален.'));
      yield settingsStoreGetTemplates();
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
    templateVarLoading: true,
  }));
  yield queryResultAnalysis(
    api.settingsStoreGetTemplateVar,
    undefined,
    function* (res) {
      yield put(actions.settingsStoreSetSection({
        templateVar: res,
        templateVarLoading: false,
      }));
    },
    function* () {
      yield put(actions.settingsStoreSetSection({
        templateVar: [],
        templateVarLoading: false,
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
  yield put(actions.popUpStoreSetSection({
    [`${id}Loading`]: true,
  }));
  yield queryResultAnalysis(
    api.dadataGetAddress,
    query,
    function* (res) {
      yield put(actions.popUpStoreSetSection({
        [`${id}Loading`]: false,
        [`${id}Results`]: res.suggestions,
      }));
    },
    function* () {
      yield put(actions.popUpStoreSetSection({
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
