const initialTokenStore = {
  token: '',
};

export default function tokenStore(state = initialTokenStore, action) {
  switch (action.type) {
    case 'TOKEN_STORE_SET_TOKEN':
      return { token: action.value };
    case 'TOKEN_STORE_CLEAR_TOKEN':
      return initialTokenStore;
    default:
      return state;
  }
}
