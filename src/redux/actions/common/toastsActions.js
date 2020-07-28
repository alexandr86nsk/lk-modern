/* ********************************* ToastsStore  ********************************************** */
export const toastsStoreAddToast = (value) => ({
  type: 'TOASTS_STORE_ADD_TOAST',
  value,
});

export const toastsStoreRemoveToast = (value) => ({
  type: 'TOASTS_STORE_REMOVE_TOAST',
  value,
});
