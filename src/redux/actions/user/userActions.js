/* ********************************* UserStore  ********************************************** */
export const userStoreSet = (value) => ({
  type: 'USER_STORE_SET',
  value,
});

export const userStoreClear = () => ({
  type: 'USER_STORE_CLEAR',
});

export const userStoreSetValue = (name, value) => ({
  type: 'USER_STORE_SET_VALUE',
  name,
  value,
});

export const userStoreGetUserInfo = () => ({
  type: 'USER_STORE_GET_USER_INFO',
});
