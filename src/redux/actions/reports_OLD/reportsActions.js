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


export const reportsStoreGetOperationalReport = (value) => ({
  type: 'REPORTS_STORE_GET_OPERATIONAL_REPORT',
  value,
});

export const reportsStoreGetOperationalReportCancel = () => ({
  type: 'REPORTS_STORE_GET_OPERATIONAL_REPORT_CANCEL',
});

export const reportsStoreGetRewardReport = (value) => ({
  type: 'REPORTS_STORE_GET_REWARD_REPORT',
  value,
});

export const reportsStoreGetRewardReportCancel = () => ({
  type: 'REPORTS_STORE_GET_REWARD_REPORT_CANCEL',
});

export const reportsStoreGetActivationReport = (value) => ({
  type: 'REPORTS_STORE_GET_ACTIVATION_REPORT',
  value,
});

export const reportsStoreGetActivationReportCancel = () => ({
  type: 'REPORTS_STORE_GET_ACTIVATION_REPORT_CANCEL',
});
