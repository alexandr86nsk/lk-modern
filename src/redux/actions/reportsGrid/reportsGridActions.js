/* ************************** reportsGridStore  ******************************** */
export const reportsGridStoreSetSection = (value) => ({
  type: 'REPORTS_GRID_STORE_SET_SECTION',
  value,
});

export const reportsGridStoreGetBriefcases = () => ({
  type: 'REPORTS_GRID_STORE_GET_BRIEFCASES',
});

export const reportsGridStoreGetBriefcasesCancel = () => ({
  type: 'REPORTS_GRID_STORE_GET_BRIEFCASES_CANCEL',
});

export const reportsGridStoreAddReport = (value) => ({
  type: 'REPORTS_GRID_STORE_ADD_REPORT',
  value,
});

export const reportsGridStoreSetReportSection = (value) => ({
  type: 'REPORTS_GRID_STORE_SET_REPORT_SECTION',
  value,
});

export const reportsGridStoreRemoveReport = (value) => ({
  type: 'REPORTS_GRID_STORE_REMOVE_REPORT',
  value,
});

export const reportsGridStoreGetJobDetailReport = (value) => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_DETAIL_REPORT',
  value,
});

export const reportsGridStoreGetJobDetailReportCancel = () => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_DETAIL_REPORT_CANCEL',
});

export const reportsGridStoreGetJobStatusReport = (value) => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_STATUS_REPORT',
  value,
});

export const reportsGridStoreGetJobStatusReportCancel = () => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_STATUS_REPORT_CANCEL',
});

export const reportsGridStoreGetJobHistoryReport = (value) => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_HISTORY_REPORT',
  value,
});

export const reportsGridStoreGetJobHistoryReportCancel = () => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_HISTORY_REPORT_CANCEL',
});

export const reportsGridStoreGetJobCallHandlingReport = (value) => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_CALL_HANDLING_REPORT',
  value,
});

export const reportsGridStoreGetJobCallHandlingReportCancel = () => ({
  type: 'REPORTS_GRID_STORE_GET_JOB_CALL_HANDLING_REPORT_CANCEL',
});
