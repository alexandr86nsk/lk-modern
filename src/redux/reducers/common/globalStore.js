const initialGlobalStore = {
  showSidebar: false,
};

export default function globalStore(state = initialGlobalStore, action) {
  const {
    value,
    type,
  } = action || {};

  switch (type) {
    case 'GLOBAL_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'GLOBAL_STORE_CLEAR':
      return initialGlobalStore;
    default:
      return state;
  }
}
