import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis } from '../common/globalSaga';

const reportsType = {
  jobDetailReport: 'getJobDetailReport',
  jobStatusReport: 'getJobStatusReport',
  jobHistoryReport: 'getJobHistoryReport',
  jobCallHandlingReport: 'getJobCallHandlingReport',
};

/* ***************************** getBriefcases ********************** */
function* getBriefcases() {
  yield put(actions.reportsGridStoreSetSection({
    briefcasesLoading: true,
  }));
  yield queryResultAnalysis(
    api.getBriefCases,
    undefined,
    function* (res) {
      yield put(actions.reportsGridStoreSetSection({
        briefcases: res && Array.isArray(res) && res.map((v) => {
          const { BriefcaseId, Title, QueuePhone } = v || {};
          return {
            value: BriefcaseId,
            label: Title,
            queuePhone: QueuePhone,
          };
        }),
        briefcasesLoading: false,
      }));
    },
    function* () {
      yield put(actions.reportsGridStoreSetSection({
        briefcasesLoading: false,
      }));
    },
  );
}

export function* canBeCanceledGetBriefcases() {
  const bgGetBriefcases = yield fork(getBriefcases);
  yield take('REPORTS_GRID_STORE_GET_BRIEFCASES_CANCEL');
  yield cancel(bgGetBriefcases);
}

/* ***************************** getReport ********************** */
function* getReport(value) {
  const { auto, data } = value || {};
  const { selectedBriefcase, id, type } = data || {};
  if (!auto) {
    yield put(actions.reportsGridStoreSetReportSection({
      id,
      loading: true,
      isLastRequestComplete: false,
    }));
  } else {
    yield put(actions.reportsGridStoreSetReportSection({
      id,
      isLastRequestComplete: false,
    }));
  }
  yield queryResultAnalysis(
    api[reportsType[type]],
    { briefcaseId: selectedBriefcase },
    function* (res) {
      yield put(actions.reportsGridStoreSetReportSection({
        id,
        loading: false,
        isLastRequestComplete: true,
        data: res,
      }));
    },
    function* () {
      yield put(actions.reportsGridStoreSetReportSection({
        id,
        loading: false,
        isLastRequestComplete: true,
      }));
    },
    auto,
  );
}

export function* canBeCanceledGetReport(action) {
  const bgGetReport = yield fork(getReport, action.value);
  const {
    data,
  } = action.value || {};
  const {
    id,
  } = data || {};
  const cancelAction = yield take('REPORTS_GRID_STORE_GET_REPORT_CANCEL');
  const {
    value: cancelId,
  } = cancelAction || {};
  if (id === cancelId) {
    yield cancel(bgGetReport);
  }
}

/* /!* ***************************** getJobDetailReport ********************** *!/
function* getJobDetailReport(value) {
  const { auto, selectedBriefcase, id } = value || {};
  if (!auto) {
    yield put(actions.reportsGridStoreSetReportSection({
      id,
      loading: true,
      isLastRequestComplete: false,
    }));
  } else {
    yield put(actions.reportsGridStoreSetReportSection({
      id,
      isLastRequestComplete: false,
    }));
  }
  yield queryResultAnalysis(
    api.getJobDetailReport,
    { briefcaseId: selectedBriefcase },
    function* (res) {
      yield put(actions.reportsGridStoreSetReportSection({
        id,
        loading: false,
        isLastRequestComplete: true,
        data: res,
      }));
    },
    function* () {
      yield put(actions.reportsGridStoreSetReportSection({
        id,
        loading: false,
        isLastRequestComplete: true,
      }));
    },
  );
}

export function* canBeCanceledGetJobDetailReport(action) {
  const bgGetJobDetailReport = yield fork(getJobDetailReport, action.value);
  yield take('REPORTS_GRID_STORE_GET_JOB_DETAIL_REPORT_CANCEL');
  yield cancel(bgGetJobDetailReport);
} */

/* /!* ***************************** getJobStatusReport ********************** *!/
function* getJobStatusReport(value) {
  const { auto, selectedBriefcase, id } = value || {};
  if (!auto) {
    yield put(actions.reportsGridStoreSetReportSection({
      id,
      loading: true,
      isLastRequestComplete: false,
    }));
  } else {
    yield put(actions.reportsGridStoreSetReportSection({
      id,
      isLastRequestComplete: false,
    }));
  }
  yield queryResultAnalysis(
    api.getJobStatusReport,
    { briefcaseId: selectedBriefcase },
    function* (res) {
      yield put(actions.reportsGridStoreSetReportSection({
        id,
        loading: false,
        isLastRequestComplete: true,
        data: res,
      }));
    },
    function* () {
      yield put(actions.reportsGridStoreSetReportSection({
        id,
        loading: false,
        isLastRequestComplete: true,
      }));
    },
  );
}

export function* canBeCanceledGetJobStatusReport(action) {
  const bgGetJobStatusReport = yield fork(getJobStatusReport, action.value);
  yield take('REPORTS_GRID_STORE_GET_JOB_STATUS_REPORT_CANCEL');
  yield cancel(bgGetJobStatusReport);
} */

/* /!* ***************************** getJobHistoryReport ********************** *!/
function* getJobHistoryReport(value) {
  if (!value.auto) {
    yield put(actions.reportsGridStoreSetReportSection({
      id: value.id,
      loading: true,
    }));
  }
  try {
    const res = yield call(api.getJobHistoryReport, value);
    // yield delay(50000);
    yield put(actions.reportsGridStoreSetReportSection({
      id: value.id,
      data: res.data, /!* [
        {...res.data[0], BriefcaseTitle: 'Test1', StatusName: "Кампания готовиться"},
        {...res.data[0], BriefcaseTitle: 'Test2', StartDate: '2020-06-02T01:32:34+00:00', StatusName: "Кампания запущена"},
        {...res.data[0], BriefcaseTitle: 'Test3', StartDate: '2020-06-02T02:32:34+00:00'},
        {...res.data[0], BriefcaseTitle: 'Test4', StartDate: '2020-06-02T03:32:34+00:00', StatusName: "Кампания запущена"},
        {...res.data[0], BriefcaseTitle: 'Test5', StartDate: '2020-06-02T04:32:34+00:00'},
        {...res.data[0], BriefcaseTitle: 'Test6', StartDate: '2020-06-02T05:32:34+00:00'},
        {...res.data[0], BriefcaseTitle: 'Test7', StartDate: '2020-06-02T06:32:34+00:00'},
        {...res.data[0], BriefcaseTitle: 'Test8', StartDate: '2020-06-02T07:32:34+00:00', StatusName: "Кампания запущена"},
        {...res.data[0], BriefcaseTitle: 'Test9', StartDate: '2020-06-02T08:32:34+00:00', StatusName: "Кампания запущена"},
        {...res.data[0], BriefcaseTitle: 'Test10', StartDate: '2020-06-02T09:32:34+00:00'},
        {...res.data[0], BriefcaseTitle: 'Test11', StartDate: '2020-06-02T09:52:34+00:00', StatusName: "Кампания завершена"},
      ], *!/
      loading: false,
    }));
  } catch (e) {
    yield put(actions.reportsGridStoreSetReportSection({
      id: value.id,
      loading: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetJobHistoryReport(action) {
  const bgGetJobHistoryReport = yield fork(getJobHistoryReport, action.value);
  yield take('TEST_PAGE_STORE_GET_JOB_HISTORY_REPORT_CANCEL');
  yield cancel(bgGetJobHistoryReport);
}
/!* ***************************** getJobCallHandlingReport ********************** *!/
function* getJobCallHandlingReport(value) {
  if (!value.auto) {
    yield put(actions.reportsGridStoreSetReportSection({
      id: value.id,
      loading: true,
    }));
  }
  try {
    const res = yield call(api.getJobCallHandlingReport, value);
    // yield delay(50000);
    yield put(actions.reportsGridStoreSetReportSection({
      id: value.id,
      data: res.data,
      loading: false,
    }));
  } catch (e) {
    yield put(actions.reportsGridStoreSetReportSection({
      id: value.id,
      loading: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetJobCallHandlingReport(action) {
  const bgGetJobCallHandlingReport = yield fork(getJobCallHandlingReport, action.value);
  yield take('TEST_PAGE_STORE_GET_JOB_CALL_HANDLING_REPORT_CANCEL');
  yield cancel(bgGetJobCallHandlingReport);
} */
