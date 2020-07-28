/* ******************************* ModalStore  ********************************************** */
export const modalStoreSet = (value) => ({
  type: 'MODAL_STORE_SET',
  value,
});

export const modalStoreClear = () => ({
  type: 'MODAL_STORE_CLEAR',
});

export const modalStoreSetSection = (value) => ({
  type: 'MODAL_STORE_SET_SECTION',
  value,
});

export const modalStoreSetValue = (name, value) => ({
  type: 'MODAL_STORE_SET_VALUE',
  name,
  value,
});

export const modalStoreSetTempDataValue = (name, value) => ({
  type: 'MODAL_STORE_SET_TEMP_DATA_VALUE',
  name,
  value,
});

export const modalStoreSetTempDataSection = (value) => ({
  type: 'MODAL_STORE_SET_TEMP_DATA_SECTION',
  value,
});

export const modalStoreSetFilteredTempDataValue = (name, value) => {
  if (name === 'bic' && value.length === 9) {
    return {
      type: 'LEGAL_ENTITY_ITEM_STORE_GET_DATA_BY_BIC',
      value,
    };
  }
  return {
    type: 'MODAL_STORE_SET_TEMP_DATA_VALUE',
    name,
    value,
  };
};
