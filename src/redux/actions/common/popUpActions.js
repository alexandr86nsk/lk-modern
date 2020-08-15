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

export const popUpStoreSetSubSection = (name, value) => ({
  type: 'POP_UP_STORE_SET_SUB_SECTION',
  name,
  value,
});

export const popUpStoreSetSubSectionSection = (name, subName, value) => ({
  type: 'POP_UP_STORE_SET_SUB_SECTION_SECTION',
  name,
  subName,
  value,
});

export const popUpStoreSetValue = (name, value) => ({
  type: 'POP_UP_STORE_SET_VALUE',
  name,
  value,
});
