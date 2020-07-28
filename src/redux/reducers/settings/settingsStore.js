const initialSettingsStore = {
  dataLoaded: false,
};

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
    case 'SETTINGS_STORE_CHANGE_RECALL_ITEM':
      return {
        ...state,
        recall: state.recall.map((v) => {
          if (v.EventCode === action.id) {
            return {
              ...v,
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_CHANGE_TIME_ZONE_ITEM':
      return {
        ...state,
        timeZone: state.timeZone.map((v) => {
          if (v.TimeZoneId === action.value.TimeZoneId) {
            return {
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'SETTINGS_STORE_CHANGE_QUEUE_PHONE_ITEM':
      return {
        ...state,
        queuePhone: state.queuePhone.map((v) => {
          if (v.Id === action.value.Id) {
            return {
              ...action.value,
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
