const initialPageControlStore = {
  show: false,
  data: {},
};

export default function pageControlStore(state = initialPageControlStore, action) {
  switch (action.type) {
    case 'PAGE_CONTROL_STORE_SET':
      return action.value;
    case 'PAGE_CONTROL_STORE_CLEAR':
      return initialPageControlStore;
    case 'PAGE_CONTROL_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'PAGE_CONTROL_STORE_SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'PAGE_CONTROL_STORE_SET_DATA_VALUE':
      return {
        ...state,
        data: {
          ...state.data,
          [action.name]: action.value,
        },
      };
    case 'PAGE_CONTROL_STORE_SET_DATA_ACTIONS_VALUE':
      return {
        ...state,
        data: {
          ...state.data,
          actions: {
            ...state.data.actions,
            [action.name]: action.value,
          },
        },
      };
    case 'PAGE_CONTROL_STORE_SET_DATA_HIDE_VALUE':
      return {
        ...state,
        data: {
          ...state.data,
          hide: {
            ...state.data.hide,
            [action.name]: action.value,
          },
        },
      };
    case 'PAGE_CONTROL_STORE_SET_LOADING_VALUE':
      return {
        ...state,
        data: {
          ...state.data,
          loading: {
            ...state.data.loading,
            [action.name]: action.value,
          },
        },
      };
    default:
      return state;
  }
}
