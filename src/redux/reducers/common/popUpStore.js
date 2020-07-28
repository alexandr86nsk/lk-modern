const initialPopUpStore = {
  item: {},
  show: false,
  loading: false,
};

export default function popUpStore(state = initialPopUpStore, action) {
  switch (action.type) {
    case 'POP_UP_STORE_SET':
      return action.value;
    case 'POP_UP_STORE_CLEAR':
      return initialPopUpStore;
    case 'POP_UP_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'POP_UP_STORE_SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
}
