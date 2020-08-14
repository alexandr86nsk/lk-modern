const initialSettingsStore = {};

export default function settingsStore(state = initialSettingsStore, action) {
  const {
    userInfo,
    settings,
    usersTableStore,
    usersTableTemplate,
    templatesTableStore,
    templatesTableTemplate,
    templateInfo,
  } = state || {};
  const {
    addressRegistration,
    addressResidence,
  } = userInfo || {};
  const {
    value,
    name,
    type,
  } = action || {};
  switch (type) {
    case 'SETTINGS_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'SETTINGS_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [name]: {
          ...state[name],
          ...value,
        },
      };
    case 'SETTINGS_STORE_UPDATE_SETTINGS':
      return {
        ...state,
        settings: settings.map((v) => {
          const {
            id: currentId,
          } = v || {};
          const {
            id: actionId,
            value: actionValue,
          } = value || {};
          if (currentId === actionId) {
            return {
              ...v,
              value: actionValue,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_SET_USERS_TABLE_STORE_SECTION':
      return {
        ...state,
        usersTableStore: {
          ...usersTableStore,
          ...value,
        },
      };
    case 'SETTINGS_STORE_STORE_SET_USERS_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        usersTableTemplate: usersTableTemplate.map((v) => {
          const {
            dataKey: currentId,
          } = v || {};
          const {
            dataKey: actionId,
          } = value || {};
          if (currentId === actionId) {
            return {
              ...v,
              ...value,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_SET_USER_INFO_SECTION':
      return {
        ...state,
        userInfo: {
          ...userInfo,
          ...value,
        },
      };
    case 'SETTINGS_STORE_SET_USER_INFO_ADDRESS_REGISTRATION_SECTION':
      return {
        ...state,
        userInfo: {
          ...userInfo,
          addressRegistration: {
            ...addressRegistration,
            ...value,
          },
        },
      };
    case 'SETTINGS_STORE_SET_USER_INFO_ADDRESS_RESIDENCE_SECTION':
      return {
        ...state,
        userInfo: {
          ...userInfo,
          addressResidence: {
            ...addressResidence,
            ...value,
          },
        },
      };
    case 'SETTINGS_STORE_CLEAR_USER_INFO':
      return {
        ...state,
        userInfo: undefined,
      };
    case 'SETTINGS_STORE_SET_TEMPLATES_TABLE_STORE_SECTION':
      return {
        ...state,
        templatesTableStore: {
          ...templatesTableStore,
          ...value,
        },
      };
    case 'SETTINGS_STORE_STORE_SET_TEMPLATES_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        templatesTableTemplate: templatesTableTemplate.map((v) => {
          const {
            dataKey: currentId,
          } = v || {};
          const {
            dataKey: actionId,
          } = value || {};
          if (currentId === actionId) {
            return {
              ...v,
              ...value,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_SET_TEMPLATE_INFO_SECTION':
      return {
        ...state,
        templateInfo: {
          ...templateInfo,
          ...value,
        },
      };
    case 'SETTINGS_STORE_CLEAR_TEMPLATE_INFO':
      return {
        ...state,
        templateInfo: undefined,
      };
    case 'SETTINGS_STORE_CLEAR':
      return initialSettingsStore;
    default:
      return state;
  }
}
