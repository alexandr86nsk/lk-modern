const arr = [
  {
    id: 0,
    x: 0,
    y: 0,
    w: 6,
    h: 5,
  },
  {
    id: 1,
    x: 6,
    y: 0,
    w: 6,
    h: 5,
  },
  {
    id: 2,
    x: 12,
    y: 0,
    w: 6,
    h: 5,
  },
  {
    id: 3,
    x: 18,
    y: 0,
    w: 6,
    h: 5,
  },
  {
    id: 4,
    x: 24,
    y: 0,
    w: 6,
    h: 5,
  },
];

const initialReportsGridStore = { reports: [0, 1, 2, 3, 4] };

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
    case 'REPORTS_GRID_STORE_CLEAR':
      return initialReportsGridStore;
    default:
      return state;
  }
}
