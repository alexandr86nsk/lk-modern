const initialUserStore = {};

export default function userStore(state = initialUserStore, action) {
  switch (action.type) {
    case 'USER_STORE_SET':
      return action.value;
    case 'USER_STORE_CLEAR':
      return initialUserStore;
    case 'USER_STORE_SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
}
