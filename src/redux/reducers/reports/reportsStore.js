const initialReportsStore = {
  history: [],
  actualState: [],
  briefcases: [],
};

export default function reportsStore(state = initialReportsStore, action) {
  switch (action.type) {
    case 'REPORTS_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'REPORTS_STORE_CLEAR':
      return initialReportsStore;
    default:
      return state;
  }
}
