const initialBriefcaseListStore = {
  dataLoaded: false,
};

export default function briefcaseListStore(state = initialBriefcaseListStore, action) {
  switch (action.type) {
    case 'BRIEFCASE_LIST_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'BRIEFCASE_LIST_STORE_CLEAR':
      return initialBriefcaseListStore;
    case 'BRIEFCASE_LIST_STORE_SET_TABLE_STORE_SECTION':
      return {
        ...state,
        tableStore: {
          ...state.tableStore,
          ...action.value,
        },
      };
    case 'BRIEFCASE_LIST_STORE_SET_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        tableTemplate: state.tableTemplate.map((v) => {
          if (v.dataKey === action.value.dataKey) {
            return {
              ...v,
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'BRIEFCASE_STORE_CHANGE_RECALL_SETTINGS':
      return {
        ...state,
        queueAsteriskRetryRulesSettings: state.queueAsteriskRetryRulesSettings.map((v) => {
          if (v.EventCode === action.value.id) {
            return {
              ...v,
              [action.value.name]: action.value.value,
            };
          }
          return v;
        }),
      };
    case 'BRIEFCASE_STORE_CHANGE_QUEUE_ASTERISK_SETTINGS':
      return {
        ...state,
        queueAsteriskSettings: {
          ...state.queueAsteriskSettings,
          ...action.value,
        },
      };
    case 'BRIEFCASE_STORE_CHANGE_TIME_ZONE_SETTINGS':
      return {
        ...state,
        queueAsteriskTimeZoneSettings: state.queueAsteriskTimeZoneSettings.map((v) => {
          if (v.TimeZoneId === action.value.id) {
            return {
              ...v,
              [action.value.name]: action.value.value,
            };
          }
          return v;
        }),
      };
    default:
      return state;
  }
}
