const initialBriefcasesStore = {};

export default function briefcasesStore(state = initialBriefcasesStore, action) {
  const {
    value,
    type,
  } = action || {};
  const {
    dataKey,
    id,
    name: valueName,
    value: valueValue,
  } = value || {};
  const {
    queueMainSettings,
    tableStore,
    tableTemplate,
  } = state || {};
  switch (type) {
    case 'BRIEFCASES_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'BRIEFCASES_STORE_CLEAR':
      return initialBriefcasesStore;
    case 'BRIEFCASES_STORE_SET_TABLE_STORE_SECTION':
      return {
        ...state,
        tableStore: {
          ...tableStore,
          ...value,
        },
      };
    case 'BRIEFCASES_STORE_SET_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        tableTemplate: tableTemplate.map((v) => {
          const { dataKey: thisDataKey } = v || {};
          if (thisDataKey === dataKey) {
            return {
              ...v,
              ...value,
            };
          }
          return v;
        }),
      };
    case 'BRIEFCASES_STORE_CHANGE_MAIN_SETTINGS':
      return {
        ...state,
        queueMainSettings: {
          ...queueMainSettings,
          ...value,
        },
      };
    case 'BRIEFCASES_STORE_CHANGE_RECALL_SETTINGS':
      return {
        ...state,
        queueRecallSettings: state.queueRecallSettings.map((v) => {
          const { EventCode } = v || {};
          if (EventCode === id) {
            return {
              ...v,
              [valueName]: valueValue,
            };
          }
          return v;
        }),
      };
    case 'BRIEFCASES_STORE_CHANGE_TIME_ZONE_SETTINGS':
      return {
        ...state,
        queueTimeZoneSettings: state.queueTimeZoneSettings.map((v) => {
          const { TimeZoneId } = v || {};
          if (TimeZoneId === id) {
            return {
              ...v,
              [valueName]: valueValue,
            };
          }
          return v;
        }),
      };
    default:
      return state;
  }
}
