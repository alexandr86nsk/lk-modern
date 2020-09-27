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

export const reportsStoreGetBriefcases = () => ({
  type: 'REPORTS_STORE_GET_BRIEFCASES',
});

export const reportsStoreGetBriefcasesCancel = () => ({
  type: 'REPORTS_STORE_GET_BRIEFCASES_CANCEL',
});

export const reportsStoreGetActualState = (value) => ({
  type: 'REPORTS_STORE_GET_ACTUAL_STATE',
  value,
});

export const reportsStoreGetActualStateCancel = () => ({
  type: 'REPORTS_STORE_GET_ACTUAL_STATE_CANCEL',
});

export const reportsStoreGetHistory = (value) => ({
  type: 'REPORTS_STORE_GET_HISTORY',
  value,
});

export const reportsStoreGetHistoryCancel = () => ({
  type: 'REPORTS_STORE_GET_HISTORY_CANCEL',
});

export const reportsStoreGetHistoryExcell = (value) => ({
  type: 'REPORTS_STORE_GET_HISTORY_EXCELL',
  value,
});

export const reportsStoreGetHistoryExcellCancel = () => ({
  type: 'REPORTS_STORE_GET_HISTORY_EXCELL_CANCEL',
});

export const reportsStoreGetCallStatistic = (value) => ({
  type: 'REPORTS_STORE_GET_CALL_STATISTIC',
  value,
});

export const reportsStoreGetCallStatisticCancel = () => ({
  type: 'REPORTS_STORE_GET_CALL_STATISTIC_CANCEL',
});

export const reportsStoreGetOperatorInfo = (value) => ({
  type: 'REPORTS_STORE_GET_OPERATOR_INFO',
  value,
});

export const reportsStoreGetOperatorInfoCancel = () => ({
  type: 'REPORTS_STORE_GET_OPERATOR_INFO_CANCEL',
});

export const reportsStoreSetActualStateTableStoreSection = (value) => ({
  type: 'REPORTS_STORE_SET_ACTUAL_STATE_TABLE_STORE_SECTION',
  value,
});

export const reportsStoreSetActualStateTableTemplateSection = (value) => ({
  type: 'REPORTS_STORE_SET_ACTUAL_STATE_TABLE_TEMPLATE_SECTION',
  value,
});
