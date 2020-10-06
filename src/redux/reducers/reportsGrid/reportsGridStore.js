const initialReportsGridStore = { reports: [] };

export default function reportsGridStore(state = initialReportsGridStore, action) {
  switch (action.type) {
    case 'REPORTS_GRID_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'REPORTS_GRID_STORE_ADD_REPORT':
      return {
        ...state,
        reports: [...state.reports, action.value],
      };
    case 'REPORTS_GRID_STORE_SET_REPORT_SECTION':
      return {
        ...state,
        reports: state.reports.map((v) => {
          if (v.id === action.value.id) {
            return {
              ...v,
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'REPORTS_GRID_STORE_REMOVE_REPORT':
      return {
        ...state,
        reports: state.reports.filter((v) => v.id !== action.value),
      };
    case 'REPORTS_GRID_STORE_SET_REPORT_TABLE_STORE_SECTION':
      return {
        ...state,
        reports: state.reports.map((v) => {
          const { id, ...otherValue } = action.value || {};
          if (v.id === id) {
            const { tableStore } = v || {};
            return {
              ...v,
              tableStore: {
                ...tableStore,
                ...otherValue,
              },
            };
          }
          return v;
        }),
      };
    case 'REPORTS_GRID_STORE_SET_REPORT_TABLE_TEMPLATE_SECTION':
      return {
        ...state,
        reports: state.reports.map((v) => {
          const { id, ...otherValue } = action.value || {};
          if (v.id === id) {
            const { tableTemplate } = v || {};
            return {
              ...v,
              tableTemplate: {
                ...tableTemplate,
                ...otherValue,
              },
            };
          }
          return v;
        }),
      };
    case 'REPORTS_GRID_STORE_CLEAR':
      return initialReportsGridStore;
    default:
      return state;
  }
}
