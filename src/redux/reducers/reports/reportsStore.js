const initialReportsStore = {};

export default function reportsStore(state = initialReportsStore, action) {
  const {
    value,
    name,
    type,
  } = action || {};
  const {
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
    case 'REPORTS_STORE_CLEAR':
      return initialReportsStore;
    default:
      return state;
  }
}
