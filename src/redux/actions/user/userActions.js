/* ********************************* userStore  ********************************************** */
export const userStoreClear = () => ({
  type: 'USER_STORE_CLEAR',
});

export const userStoreSetSection = (value) => ({
  type: 'USER_STORE_SET_SECTION',
  value,
});
