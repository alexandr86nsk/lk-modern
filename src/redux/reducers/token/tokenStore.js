const initialTokenStore = {
  token: '',
};

export default function tokenStore(state = initialTokenStore, action) {
  switch (action.type) {
    case 'TOKEN_STORE_SET_SECTION':
      return { ...state, ...action.value };
    case 'TOKEN_STORE_CLEAR':
      return initialTokenStore;
    default:
      return state;
  }
}
