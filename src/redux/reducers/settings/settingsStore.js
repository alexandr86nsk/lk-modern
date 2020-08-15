const initialSettingsStore = {};

export default function settingsStore(state = initialSettingsStore, action) {
  const {
    value,
    name,
    type,
  } = action || {};
  const {
    settings,
    usersTableStore,
    usersTableTemplate,
    templatesTableStore,
    templatesTableTemplate,
    [name]: stateName,
  } = state || {};
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
          ...stateName,
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
    case 'SETTINGS_STORE_CLEAR':
      return initialSettingsStore;
    default:
      return state;
  }
}
