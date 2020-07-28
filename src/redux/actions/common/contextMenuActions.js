/* ******************************* contextMenuStore  **************************************** */
export const contextMenuStoreSet = (value) => ({
  type: 'CONTEXT_MENU_STORE_SET',
  value,
});

export const contextMenuStoreClear = () => ({
  type: 'CONTEXT_MENU_STORE_CLEAR',
});

export const contextMenuStoreSetSection = (value) => ({
  type: 'CONTEXT_MENU_STORE_SET_SECTION',
  value,
});
