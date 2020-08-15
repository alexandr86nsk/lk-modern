const initialPopUpStore = {};

export default function popUpStore(state = initialPopUpStore, action) {
  const {
    name,
    subName,
    value,
    type,
  } = action || {};
  const {
    [name]: stateName,
  } = state || {};
  const {
    [subName]: stateSubName,
  } = stateName || {};
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
          ...stateName,
          ...value,
        },
      };
    case 'POP_UP_STORE_SET_SUB_SECTION_SECTION':
      return {
        ...state,
        [name]: {
          ...stateName,
          [subName]: {
            ...stateSubName,
            ...value,
          },
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
