const initialGlobalStore = {
  showSidebar: true,
};

export default function globalStore(state = initialGlobalStore, action) {
  switch (action.type) {
    case 'GLOBAL_STORE_SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'GLOBAL_STORE_CLEAR':
      return initialGlobalStore;
    default:
      return state;
  }
}
