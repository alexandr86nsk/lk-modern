const initialBriefcaseItemStore = {
  dataLoaded: false,
  tableDataLoaded: false,
};

export default function briefcaseItemStore(state = initialBriefcaseItemStore, action) {
  switch (action.type) {
    case 'BRIEFCASE_ITEM_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'BRIEFCASE_ITEM_STORE_CLEAR':
      return initialBriefcaseItemStore;
    default:
      return state;
  }
}
