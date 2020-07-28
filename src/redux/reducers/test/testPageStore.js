const initialTestPageStore = {
  reports: [],
};

export default function testPageStore(state = initialTestPageStore, action) {
  switch (action.type) {
    case 'TEST_PAGE_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'TEST_PAGE_STORE_ADD_REPORT':
      return {
        ...state,
        reports: [...state.reports, action.value]
      };
    case 'TEST_PAGE_STORE_UPDATE_REPORT':
      return {
        ...state,
        reports: state.reports.map((v) => {
          if (v.id.toString() === action.value.id.toString()) {
            return {
              ...v,
              ...action.value,
            };
          }
          return v;
        }),
      };
    case 'TEST_PAGE_STORE_CHANGE_REPORT_TYPE':
      return {
        ...state,
        reports: state.reports.map((v) => {
          if (v.id.toString() === action.value.toString()) {
            return {
              ...v,
              type: v.type === 'tab' ? '' : 'tab',
            };
          }
          return v;
        }),
      };
    case 'TEST_PAGE_STORE_REMOVE_REPORT':
      return {
        ...state,
        reports: state.reports.filter((v) => v.id.toString() !== action.value.toString()),
      };
    case 'TEST_PAGE_STORE_SET_MAIN_REPORT':
      return {
        ...state,
        mainReport: action.value,
      };
    case 'TEST_PAGE_STORE_CLEAR':
      return initialTestPageStore;
    default:
      return state;
  }
}
