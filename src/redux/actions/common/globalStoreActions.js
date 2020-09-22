/* ******************************* globalStore  ************************************** */
export const globalStoreClear = () => ({
  type: 'GLOBAL_STORE_CLEAR',
});

export const globalStoreSetSection = (value) => ({
  type: 'GLOBAL_STORE_SET_SECTION',
  value,
});
