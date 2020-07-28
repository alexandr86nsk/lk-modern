import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { setErrorToast, setSuccessToast } from '../common/globalSaga';

function* getError(error) {
  if (error.response && error.response.data.description === 'Неверный токен') {
    yield put(actions.clearToken());
  } else if (error.response && error.response.data.description) {
    yield setErrorToast(error.response.data.description);
  } else {
    yield setErrorToast('При зугрузке данных произошла ошибка. Пожалуйста обновите страницу');
  }
}

/* ***************************** getAllReferences ********************** */
function* getAllReferences() {
  try {
    const briefcases = yield call(api.getBriefCaseList);
    const briefcaseStatuses = yield call(api.getBriefcaseStatuses);
    const briefcaseItemResults = yield call(api.getBriefcaseItemResults);
    const briefcaseItemStatuses = yield call(api.getBriefcaseItemStatuses);
    const callResults = yield call(api.getCallResults);
    const callsStatuses = yield call(api.getCallsStatuses);
    const eventTypes = yield call(api.getEventTypes);
    yield put(actions.referencesStoreSetSection({
      briefcases: briefcases.data.map((v) => ({ value: v.BriefcaseId, label: v.Title })),
      briefcaseStatuses: briefcaseStatuses.data.map((v) => ({ value: v.Id, label: v.Name })),
      briefcaseItemResults: briefcaseItemResults.data.map((v) => ({ value: v.Id, label: v.Name })),
      // eslint-disable-next-line max-len
      briefcaseItemStatuses: briefcaseItemStatuses.data.map((v) => ({ value: v.Id, label: v.Name })),
      callResults: callResults.data.map((v) => ({ value: v.Id, label: v.Name })),
      callsStatuses: callsStatuses.data.map((v) => ({ value: v.Id, label: v.Name })),
      eventTypes: eventTypes.data.map((v) => ({ value: v.EventTypeId, label: v.Description })),
    }));
  } catch (e) {
    yield put(actions.settingsStoreSetSection({
      briefcases: [],
      briefcaseStatuses: [],
      briefcaseItemResults: [],
      briefcaseItemStatuses: [],
      callResults: [],
      callsStatuses: [],
      eventTypes: [],
    }));
    yield getError(e);
  }
}

export default function* canBeCanceledGetAllReferences() {
  const bgGetAllReferences = yield fork(getAllReferences);
  yield take('REFERENCES_STORE_GET_ALL_CANCEL');
  yield cancel(bgGetAllReferences);
}
