const initialReportsStore = {};

export default function reportsStore(state = initialReportsStore, action) {
  const {
    value,
    type,
    name,
  } = action || {};
  const {
    dataKey,
  } = value || {};
  const {
    actualStateTableStore,
    actualStateTableTemplate,
    callStatisticTableStore,
    callStatisticTableTemplate,
    [name]: stateName,
  } = state || {};
  switch (type) {
    case 'REPORTS_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'REPORTS_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [name]: {
          ...stateName,
          ...value,
        },
      };
    case 'REPORTS_STORE_SET_ACTUAL_STATE_TABLE_STORE_SECTION':
      return {
        ...state,
        actualStateTableStore: {
          ...actualStateTableStore,
          ...value,
        },
      };
    case 'REPORTS_STORE_SET_ACTUAL_STATE_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        actualStateTableTemplate: actualStateTableTemplate.map((v) => {
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
    case 'REPORTS_STORE_SET_CALL_STATISTIC_TABLE_STORE_SECTION':
      return {
        ...state,
        callStatisticTableStore: {
          ...callStatisticTableStore,
          ...value,
        },
      };
    case 'REPORTS_STORE_SET_CALL_STATISTIC_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        callStatisticTableTemplate: callStatisticTableTemplate.map((v) => {
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
    case 'REPORTS_STORE_CLEAR':
      return initialReportsStore;
    default:
      return state;
  }
}
