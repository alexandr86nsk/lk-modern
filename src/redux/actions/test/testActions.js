/* ********************************* testStore  ********************************************** */
export const testStoreSetSection = (value) => ({
  type: 'TEST_STORE_SET_SECTION',
  value,
});

export const testStoreClear = () => ({
  type: 'TEST_STORE_CLEAR',
});
