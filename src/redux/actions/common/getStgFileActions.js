/* ******************************* getStgFileActions  ************************************** */
export const getStgFile = (value) => ({
  type: 'GET_STG_FILE',
  value,
});

export const getStgFileCancel = () => ({
  type: 'GET_STG_FILE_CANCEL',
});
