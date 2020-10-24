import {
  put, fork, take, cancel,
} from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import api from '../../../api';
import actions from '../../actions/actions';
import { queryResultAnalysis } from '../common/globalSaga';

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
    auto,
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
      historyLoading: true,
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
        historyLoading: false,
        isLastRequestComplete: true,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        history: undefined,
        historyLoading: false,
        isLastRequestComplete: true,
      }));
    },
    auto,
  );
}

export function* canBeCanceledGetHistoryReport(action) {
  const bgGetHistoryReport = yield fork(getHistoryReport, action.value);
  yield take('REPORTS_STORE_GET_HISTORY_CANCEL');
  yield cancel(bgGetHistoryReport);
}

/* ***************************** getHistoryExcell ********************** */
function* getHistoryExcell(value) {
  const {
    data,
  } = value || {};
  const {
    startDate,
    endDate,
    briefcaseId,
  } = data || {};
  yield put(actions.reportsStoreSetSection({
    historyLoadingExcell: true,
  }));
  yield queryResultAnalysis(
    api.getHistoryExcell,
    {
      startDate: startDate || '',
      endDate: endDate || '',
      briefcaseId: briefcaseId || '',
    },
    function* (res) {
      if (res) {
        const {
          Base64File = '',
          FileName = 'Отчет',
        } = res || {};
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const byteCharacters = atob(Base64File);
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
        const blob = new Blob(byteArrays, { type: fileType });
        saveAs(blob, FileName);
      }
      yield put(actions.reportsStoreSetSection({
        historyLoadingExcell: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        historyLoadingExcell: false,
      }));
    },
  );
}

export function* canBeCanceledGetHistoryExcell(action) {
  const bgGetHistoryExcell = yield fork(getHistoryExcell, action.value);
  yield take('REPORTS_STORE_GET_HISTORY_EXCELL_CANCEL');
  yield cancel(bgGetHistoryExcell);
}

/* ***************************** getCallStatisticReport ********************** */
function* getCallStatisticReport(value) {
  yield put(actions.reportsStoreSetCallStatisticTableStoreSection({
    tableLoading: true,
  }));
  yield queryResultAnalysis(
    api.getCallStatisticReport,
    {
      queue: value,
    },
    function* (res) {
      yield put(actions.reportsStoreSetSection({
        callStatistic: res,
      }));
      yield put(actions.reportsStoreSetCallStatisticTableStoreSection({
        tableLoading: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        callStatistic: undefined,
      }));
      yield put(actions.reportsStoreSetCallStatisticTableStoreSection({
        tableLoading: false,
      }));
    },
  );
}

export function* canBeCanceledGetCallStatisticReport(action) {
  const bgGetCallStatisticReport = yield fork(getCallStatisticReport, action.value);
  yield take('REPORTS_STORE_GET_CALL_STATISTIC_CANCEL');
  yield cancel(bgGetCallStatisticReport);
}

/* ***************************** getOperatorInfoReport ********************** */
function* getOperatorInfoReport(value) {
  yield put(actions.reportsStoreSetSection({
    operatorInfoLoading: true,
  }));
  yield queryResultAnalysis(
    api.getOperatorInfoReport,
    {
      queue: value,
    },
    function* (res) {
      yield put(actions.reportsStoreSetSection({
        operatorInfo: res,
        operatorInfoLoading: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        operatorInfo: undefined,
        operatorInfoLoading: false,
      }));
    },
  );
}

export function* canBeCanceledGetOperatorInfoReport(action) {
  const bgGetOperatorInfoReport = yield fork(getOperatorInfoReport, action.value);
  yield take('REPORTS_STORE_GET_OPERATOR_INFO_CANCEL');
  yield cancel(bgGetOperatorInfoReport);
}
