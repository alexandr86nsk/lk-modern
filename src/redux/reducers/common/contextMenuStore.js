const initialContextMenuStore = {
  show: false,
};

export default function contextMenuStore(state = initialContextMenuStore, action) {
  switch (action.type) {
    case 'CONTEXT_MENU_STORE_SET':
      return action.value;
    case 'CONTEXT_MENU_STORE_CLEAR':
      return initialContextMenuStore;
    case 'CONTEXT_MENU_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    default:
      return state;
  }
}
