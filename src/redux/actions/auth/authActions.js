/* ********************************* authStore  ********************************************** */
export const authStoreSetSection = (value) => ({
  type: 'AUTH_STORE_SET_SECTION',
  value,
});

export const authStoreSetErrors = (value) => ({
  type: 'AUTH_STORE_SET_ERRORS',
  value,
});

export const authStoreClear = () => ({
  type: 'AUTH_STORE_CLEAR',
});

export const authStoreLogIn = (value) => ({
  type: 'AUTH_STORE_LOG_IN',
  value,
});

export const authStoreLogInCancel = () => ({
  type: 'AUTH_STORE_LOG_IN_CANCEL',
});
