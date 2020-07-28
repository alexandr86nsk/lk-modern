import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import { saveAs } from 'file-saver';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { setErrorToast } from '../common/globalSaga';

function* getError(error) {
  /* if (error.response && error.response.data.description === 'Неверный токен') {
    yield put(actions.clearToken());
  } else */
  if (error.response && error.response.data.description) {
    yield setErrorToast(error.response.data.description);
  } else {
    yield setErrorToast('При зугрузке данных произошла ошибка. Пожалуйста обновите страницу');
  }
}

/* ***************************** getActualStateReport ********************** */
function* getActualStateReport(value) {
  yield put(actions.reportsStoreSetSection({
    isLastRequestComplete: false,
  }));
  if (!value.auto) {
    yield put(actions.reportsStoreSetSection({
      actualStateLoaded: false,
    }));
  }
  try {
    const actual = yield call(api.getActualStateReport, value);
    console.log('actualData', actual);
    yield put(actions.reportsStoreSetSection({
      actualState: actual.data,
      actualStateLoaded: true,
      isLastRequestComplete: true,
    }));
  } catch (e) {
    yield put(actions.reportsStoreSetSection({
      actualState: [],
      actualStateLoaded: true,
      isLastRequestComplete: true,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetActualStateReport(action) {
  const bgGetActualStateReport = yield fork(getActualStateReport, action.value);
  yield take('REPORTS_STORE_GET_ACTUAL_STATE_CANCEL');
  yield cancel(bgGetActualStateReport);
}

/* ***************************** getHistoryReport ********************** */
function* getHistoryReport(value) {
  yield put(actions.reportsStoreSetSection({
    isLastRequestComplete: false,
  }));
  if (!value.auto) {
    yield put(actions.reportsStoreSetSection({
      historyLoaded: false,
    }));
  }
  try {
    const history = yield call(api.getHistoryReport, value);
    yield put(actions.reportsStoreSetSection({
      history: history.data,
      historyLoaded: true,
      isLastRequestComplete: true,
    }));
  } catch (e) {
    yield put(actions.reportsStoreSetSection({
      history: [],
      historyLoaded: true,
      isLastRequestComplete: true,
    }));
    yield getError(e);
  }
}

export function* canBeCanceledGetHistoryReport(action) {
  const bgGetHistoryReport = yield fork(getHistoryReport, action.value);
  yield take('REPORTS_STORE_GET_HISTORY_CANCEL');
  yield cancel(bgGetHistoryReport);
}

/* ***************************** getBriefcases ********************** */
function* getBriefcases() {
  try {
    const briefcases = yield call(api.getBriefCaseList);
    yield put(actions.reportsStoreSetSection({
      briefcases: Array.isArray(briefcases.data) ? briefcases.data.map((v) => (
        {
          value: v.BriefcaseId,
          label: v.Title,
          queuePhone: v.QueuePhone,
        }
      )) : [],
    }));
  } catch (e) {
    yield put(actions.reportsStoreSetSection({
      briefcases: [],
    }));
    yield setErrorToast('При зугрузке данных о кампаниях произошла ошибка. Пожалуйста обновите страницу');
  }
}

export function* canBeCanceledGetBriefcases() {
  const bgGetBriefcases = yield fork(getBriefcases);
  yield take('REPORTS_STORE_GET_BRIEFCASES_CANCEL');
  yield cancel(bgGetBriefcases);
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
