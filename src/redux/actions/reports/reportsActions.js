/* ******************************* reportsStore  ********************************************** */
export const reportsStoreSetSection = (value) => ({
  type: 'REPORTS_STORE_SET_SECTION',
  value,
});

export const reportsStoreSetSubSection = (name, value) => ({
  type: 'REPORTS_STORE_SET_SUB_SECTION',
  name,
  value,
});

export const reportsStoreClear = () => ({
  type: 'REPORTS_STORE_CLEAR',
});

export const reportsStoreGetRatingReportBySettlements = (value) => ({
  type: 'REPORTS_STORE_GET_RATING_REPORT_BY_SETTLEMENTS',
  value,
});

export const reportsStoreGetRatingReportBySettlementsCancel = () => ({
  type: 'REPORTS_STORE_GET_RATING_REPORT_BY_SETTLEMENTS_CANCEL',
});
