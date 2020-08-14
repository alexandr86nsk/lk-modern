const initialPopUpStore = {};

export default function popUpStore(state = initialPopUpStore, action) {
  const {
    name,
    value,
    type,
  } = action || {};
  switch (type) {
    case 'POP_UP_STORE_SET':
      return value;
    case 'POP_UP_STORE_CLEAR':
      return initialPopUpStore;
    case 'POP_UP_STORE_SET_SECTION':
      return {
        ...state,
        ...value,
      };
    case 'POP_UP_STORE_SET_SUB_SECTION':
      return {
        ...state,
        [name]: {
          ...state[name],
          ...value,
        },
      };
    case 'POP_UP_STORE_SET_VALUE':
      return {
        ...state,
        [name]: value,
      };
    default:
      return state;
  }
}
