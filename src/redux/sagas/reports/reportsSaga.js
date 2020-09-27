import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setErrorToast } from '../common/globalSaga';

function* getError(error) {
  if (error.response && error.response.data.description) {
    yield setErrorToast(error.response.data.description);
  } else {
    yield setErrorToast('При зугрузке данных произошла ошибка. Пожалуйста обновите страницу');
  }
}

/* ***************************** getBriefcases ********************** */
function* getBriefcases() {
  yield put(actions.reportsStoreSetSection({
    briefcasesLoading: true,
  }));
  yield queryResultAnalysis(
    api.getBriefCases,
    undefined,
    function* (res) {
      yield put(actions.reportsStoreSetSection({
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
      yield put(actions.reportsStoreSetSection({
        briefcasesLoading: false,
      }));
    },
  );
}

export function* canBeCanceledGetBriefcases() {
  const bgGetBriefcases = yield fork(getBriefcases);
  yield take('REPORTS_STORE_GET_BRIEFCASES_CANCEL');
  yield cancel(bgGetBriefcases);
}

/* ***************************** getActualStateReport ********************** */
function* getActualStateReport(value) {
  const {
    data,
    auto,
  } = value || {};
  const {
    startDate,
    endDate,
    briefcaseId,
    phone,
  } = data || {};
  yield put(actions.reportsStoreSetSection({
    isLastRequestComplete: false,
  }));
  if (!auto) {
    yield put(actions.reportsStoreSetActualStateTableStoreSection({
      tableLoading: true,
    }));
  }
  yield queryResultAnalysis(
    api.getActualStateReport,
    {
      startDate: startDate || '',
      endDate: endDate || '',
      briefcaseId: briefcaseId || '',
      phone: phone || '',
    },
    function* (res) {
      yield put(actions.reportsStoreSetSection({
        actualState: res,
        isLastRequestComplete: true,
      }));
      yield put(actions.reportsStoreSetActualStateTableStoreSection({
        tableLoading: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        actualState: undefined,
        isLastRequestComplete: true,
      }));
      yield put(actions.reportsStoreSetActualStateTableStoreSection({
        tableLoading: false,
      }));
    },
  );
}

export function* canBeCanceledGetActualStateReport(action) {
  const bgGetActualStateReport = yield fork(getActualStateReport, action.value);
  yield take('REPORTS_STORE_GET_ACTUAL_STATE_CANCEL');
  yield cancel(bgGetActualStateReport);
}

/* ***************************** getHistoryReport ********************** */
function* getHistoryReport(value) {
  const {
    data,
    auto,
  } = value || {};
  const {
    startDate,
    endDate,
    briefcaseId,
  } = data || {};
  yield put(actions.reportsStoreSetSection({
    isLastRequestComplete: false,
  }));
  if (!auto) {
    yield put(actions.reportsStoreSetSection({
      historyLoaded: false,
    }));
  }
  yield queryResultAnalysis(
    api.getHistoryReport,
    {
      startDate: startDate || '',
      endDate: endDate || '',
      briefcaseId: briefcaseId || '',
    },
    function* (res) {
      yield put(actions.reportsStoreSetSection({
        history: res,
        historyLoaded: true,
        isLastRequestComplete: true,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        history: undefined,
        historyLoaded: true,
        isLastRequestComplete: true,
      }));
    },
  );
}

export function* canBeCanceledGetHistoryReport(action) {
  const bgGetHistoryReport = yield fork(getHistoryReport, action.value);
  yield take('REPORTS_STORE_GET_HISTORY_CANCEL');
  yield cancel(bgGetHistoryReport);
}

/* ***************************** getHistoryExcell ********************** */
function* getHistoryExcell(value) {
  yield put(actions.reportsStoreSetSection({
    historyLoadingExcell: true,
  }));
  try {
    const file = yield call(api.getHistoryExcell, value);
    const byteCharacters = atob(file.data.Base64File || '');
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, file.data.FileName || 'Отчет');
    yield put(actions.reportsStoreSetSection({
      historyLoadingExcell: false,
    }));
  } catch (e) {
    yield put(actions.reportsStoreSetSection({
      historyLoadingExcell: false,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetHistoryExcell(action) {
  const bgGetHistoryExcell = yield fork(getHistoryExcell, action.value);
  yield take('REPORTS_STORE_GET_HISTORY_EXCELL_CANCEL');
  yield cancel(bgGetHistoryExcell);
}

/* ***************************** getCallStatisticReport ********************** */
function* getCallStatisticReport(value) {
  yield put(actions.reportsStoreSetSection({
    callStatisticReportLoaded: false,
  }));
  try {
    const callStatisticReport = yield call(api.getCallStatisticReport, value);
    yield put(actions.reportsStoreSetSection({
      callStatisticReport: callStatisticReport.data && Array.isArray(callStatisticReport.data)
        ? callStatisticReport.data
        : [callStatisticReport.data],
      callStatisticReportLoaded: true,
    }));
  } catch (e) {
    yield put(actions.reportsStoreSetSection({
      callStatisticReport: [],
      callStatisticReportLoaded: true,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetCallStatisticReport(action) {
  const bgGetCallStatisticReport = yield fork(getCallStatisticReport, action.value);
  yield take('REPORTS_STORE_GET_CALL_STATISTIC_CANCEL');
  yield cancel(bgGetCallStatisticReport);
}

/* ***************************** getOperatorInfoReport ********************** */
function* getOperatorInfoReport(value) {
  yield put(actions.reportsStoreSetSection({
    operatorInfoReportLoaded: false,
  }));
  try {
    const operatorReport = yield call(api.getOperatorInfoReport, value);
    yield put(actions.reportsStoreSetSection({
      operatorInfoReport: operatorReport.data,
      operatorInfoReportLoaded: true,
    }));
  } catch (e) {
    yield put(actions.reportsStoreSetSection({
      operatorInfoReport: {},
      operatorInfoReportLoaded: true,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetOperatorInfoReport(action) {
  const bgGetOperatorInfoReport = yield fork(getOperatorInfoReport, action.value);
  yield take('REPORTS_STORE_GET_OPERATOR_INFO_CANCEL');
  yield cancel(bgGetOperatorInfoReport);
}
