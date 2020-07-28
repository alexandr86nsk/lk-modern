/** ********************************* tokenStore  ********************************************** */
export const tokenStoreSetSection = (value) => ({
  type: 'TOKEN_STORE_SET_SECTION',
  value,
});

export const tokenStoreClear = () => ({
  type: 'TOKEN_STORE_CLEAR',
});
