export const referenceBookStoreSetValue = (name, value) => ({
  type: 'REFERENCE_BOOK_STORE_SET_VALUE',
  name,
  value,
});

export const referenceBookStoreClear = () => ({
  type: 'REFERENCE_BOOK_STORE_CLEAR',
});
