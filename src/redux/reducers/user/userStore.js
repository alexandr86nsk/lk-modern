const initialUserStore = {};

export default function userStore(state = initialUserStore, action) {
  switch (action.type) {
    case 'USER_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'USER_STORE_CLEAR':
      return initialUserStore;
    default:
      return state;
  }
}
