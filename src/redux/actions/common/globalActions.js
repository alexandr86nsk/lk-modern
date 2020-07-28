/* ********************************* GlobalStore  ********************************************** */
export const globalStoreSetValue = (name, value) => ({
  type: 'GLOBAL_STORE_SET_VALUE',
  name,
  value,
});

export const globalStoreClear = () => ({
  type: 'GLOBAL_STORE_CLEAR',
});
