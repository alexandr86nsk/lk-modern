/* ************************** referencesStore  ******************************** */
export const referencesStoreClear = () => ({
  type: 'REFERENCES_STORE_CLEAR',
});

export const referencesStoreSetSection = (value) => ({
  type: 'REFERENCES_STORE_SET_SECTION',
  value,
});

export const referencesStoreGetAll = () => ({
  type: 'REFERENCES_STORE_GET_ALL',
});

export const referencesStoreGetBriefcaseListCancel = () => ({
  type: 'REFERENCES_STORE_GET_ALL_CANCEL',
});
