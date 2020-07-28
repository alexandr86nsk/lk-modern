/* ************************** testPageStore  ******************************** */
export const testPageStoreSetSection = (value) => ({
  type: 'TEST_PAGE_STORE_SET_SECTION',
  value,
});

export const testPageStoreAddReport = (value) => ({
  type: 'TEST_PAGE_STORE_ADD_REPORT',
  value,
});

export const testPageStoreUpdateReport = (value) => ({
  type: 'TEST_PAGE_STORE_UPDATE_REPORT',
  value,
});

export const testPageStoreChangeReportType = (value) => ({
  type: 'TEST_PAGE_STORE_CHANGE_REPORT_TYPE',
  value,
});

export const testPageStoreRemoveReport = (value) => ({
  type: 'TEST_PAGE_STORE_REMOVE_REPORT',
  value,
});

export const testPageStoreSetMainReport = (value) => ({
  type: 'TEST_PAGE_STORE_SET_MAIN_REPORT',
  value,
});


export const testPageStoreClear = () => ({
  type: 'TEST_PAGE_STORE_CLEAR',
});

export const testPageStoreGetJobDetailReport = (value) => ({
  type: 'TEST_PAGE_STORE_GET_JOB_DETAIL_REPORT',
  value,
});

export const testPageStoreGetJobDetailReportCancel = () => ({
  type: 'TEST_PAGE_STORE_GET_JOB_DETAIL_REPORT_CANCEL',
});

export const testPageStoreGetJobStatusReport = (value) => ({
  type: 'TEST_PAGE_STORE_GET_JOB_STATUS_REPORT',
  value,
});

export const testPageStoreGetJobStatusReportCancel = () => ({
  type: 'TEST_PAGE_STORE_GET_JOB_STATUS_REPORT_CANCEL',
});

export const testPageStoreGetJobHistoryReport = (value) => ({
  type: 'TEST_PAGE_STORE_GET_JOB_HISTORY_REPORT',
  value,
});

export const testPageStoreGetJobHistoryReportCancel = () => ({
  type: 'TEST_PAGE_STORE_GET_JOB_HISTORY_REPORT_CANCEL',
});

export const testPageStoreGetJobCallHandlingReport = (value) => ({
  type: 'TEST_PAGE_STORE_GET_JOB_CALL_HANDLING_REPORT',
  value,
});

export const testPageStoreGetJobCallHandlingReportCancel = () => ({
  type: 'TEST_PAGE_STORE_GET_JOB_CALL_HANDLING_REPORT_CANCEL',
});
