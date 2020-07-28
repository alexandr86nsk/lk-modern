/** ********************************* tokenStore  ********************************************** */
export const setToken = (value) => ({
  type: 'TOKEN_STORE_SET_TOKEN',
  value,
});

export const clearToken = () => ({
  type: 'TOKEN_STORE_CLEAR_TOKEN',
});
