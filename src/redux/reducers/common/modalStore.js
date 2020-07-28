const initialModalStore = {
  show: false,
  outputBody: {},
  data: undefined,
  tempData: {},
  callback: '',
};

export default function modalStore(state = initialModalStore, action) {
  switch (action.type) {
    case 'MODAL_STORE_SET':
      return action.value;
    case 'MODAL_STORE_CLEAR':
      return initialModalStore;
    case 'MODAL_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'MODAL_STORE_SET_VALUE':
      return {
        ...state,
        [action.name]: action.value,
      };
    case 'MODAL_STORE_SET_TEMP_DATA_VALUE':
      return {
        ...state,
        tempData: {
          ...state.tempData,
          [action.name]: action.value,
        },
      };
    case 'MODAL_STORE_SET_TEMP_DATA_SECTION':
      return {
        ...state,
        tempData: {
          ...state.tempData,
          ...action.value,
        },
      };
    default:
      return state;
  }
}
