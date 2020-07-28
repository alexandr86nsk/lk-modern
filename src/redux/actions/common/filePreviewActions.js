/* ******************************* filePreviewStore  ************************************** */
export const filePreviewStoreSet = (value) => ({
  type: 'FILE_PREVIEW_STORE_SET',
  value,
});

export const filePreviewStoreClear = () => ({
  type: 'FILE_PREVIEW_STORE_CLEAR',
});

export const filePreviewStoreSetSection = (value) => ({
  type: 'FILE_PREVIEW_STORE_SET_SECTION',
  value,
});

export const filePreviewStoreSetValue = (name, value) => ({
  type: 'FILE_PREVIEW_STORE_SET_VALUE',
  name,
  value,
});
