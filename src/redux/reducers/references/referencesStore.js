const initialReferencesStore = {
  briefcaseStatuses: [],
  briefcaseItemResults: [],
  briefcaseItemStatuses: [],
  callResults: [],
  callsStatuses: [],
  eventTypes: [],
};

export default function referencesStore(state = initialReferencesStore, action) {
  switch (action.type) {
    case 'REFERENCES_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'REFERENCES_STORE_CLEAR':
      return initialReferencesStore;
    default:
      return state;
  }
}
