export const pageControlStoreSet = (value) => ({
  type: 'PAGE_CONTROL_STORE_SET',
  value,
});

export const pageControlStoreClear = () => ({
  type: 'PAGE_CONTROL_STORE_CLEAR',
});

export const pageControlStoreSetSection = (value) => ({
  type: 'PAGE_CONTROL_STORE_SET_SECTION',
  value,
});

export const pageControlStoreSetValue = (name, value) => ({
  type: 'PAGE_CONTROL_STORE_SET_VALUE',
  name,
  value,
});

export const pageControlStoreSetDataValue = (name, value) => ({
  type: 'PAGE_CONTROL_STORE_SET_DATA_VALUE',
  name,
  value,
});

export const pageControlStoreSetDataActionsValue = (name, value) => ({
  type: 'PAGE_CONTROL_STORE_SET_DATA_ACTIONS_VALUE',
  name,
  value,
});

export const pageControlStoreSetDataHideValue = (name, value) => ({
  type: 'PAGE_CONTROL_STORE_SET_DATA_HIDE_VALUE',
  name,
  value,
});

export const pageControlStoreSetLoadingValue = (name, value) => ({
  type: 'PAGE_CONTROL_STORE_SET_LOADING_VALUE',
  name,
  value,
});
