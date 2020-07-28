/* ******************************* pagePopUp  ************************************** */
export const popUpStoreSet = (value) => ({
  type: 'POP_UP_STORE_SET',
  value,
});

export const popUpStoreClear = () => ({
  type: 'POP_UP_STORE_CLEAR',
});

export const popUpStoreSetSection = (value) => ({
  type: 'POP_UP_STORE_SET_SECTION',
  value,
});

export const popUpStoreSetValue = (name, value) => ({
  type: 'POP_UP_STORE_SET_VALUE',
  name,
  value,
});
