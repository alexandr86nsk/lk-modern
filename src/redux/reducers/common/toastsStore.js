const initialToastsStore = {
  toasts: [],
};

export default function toastsStore(state = initialToastsStore, action) {
  switch (action.type) {
    case 'TOASTS_STORE_ADD_TOAST':
      return { toasts: [...state.toasts, action.value] };
    case 'TOASTS_STORE_REMOVE_TOAST':
      return { toasts: state.toasts.filter((v) => v.id !== action.value.id) };
    default:
      return state;
  }
}
