const initialAuthStore = {
  phone: '',
  firstName: '',
  middleName: '',
  lastName: '',
  birthday: '',
  loading: false,
  loadingText: 'Загрузка...',
  errors: '',
  showSmsCode: false,
  smsCode: '',
  sessionId: '',
};

export default function authStore(state = initialAuthStore, action) {
  switch (action.type) {
    case 'AUTH_STORE_SET_SECTION':
      return {
        ...state,
        ...action.value,
      };
    case 'AUTH_STORE_CLEAR':
      return initialAuthStore;
    default:
      return state;
  }
}
