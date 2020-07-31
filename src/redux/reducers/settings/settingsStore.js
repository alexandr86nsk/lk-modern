const initialSettingsStore = {};

export default function settingsStore(state = initialSettingsStore, action) {
  switch (action.type) {
    case 'SETTINGS_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'SETTINGS_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          ...action.value,
        },
      };
    case 'SETTINGS_STORE_UPDATE_SETTINGS':
      return {
        ...state,
        settings: state.settings.map((v) => {
          if (v.id === action.value.id) {
            return {
              ...v,
              value: action.value.value,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_SET_USERS_TABLE_STORE_SECTION':
      return {
        ...state,
        usersTableStore: {
          ...state.usersTableStore,
          ...action.value,
        },
      };
    case 'SETTINGS_STORE_STORE_SET_USERS_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        usersTableTemplate: state.usersTableTemplate.map((v) => {
          if (v.dataKey === action.value.dataKey) {
            return {
              ...v,
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_SET_USER_INFO_SECTION':
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.value,
        },
      };
    case 'SETTINGS_STORE_CLEAR':
      return initialSettingsStore;
    default:
      return state;
  }
}
