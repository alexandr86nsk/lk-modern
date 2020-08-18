import {
  call, put, fork, take, cancel, delay,
} from 'redux-saga/effects';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis, setSuccessToast } from '../common/globalSaga';

/* ***************************** calendarStoreGetHolidays ********************** */
function* calendarStoreGetHolidays(value) {
  yield put(actions.calendarStoreSetSection({
    holidaysLoading: true,
  }));
  if (value) {
    yield delay(1000);
  }
  yield queryResultAnalysis(
    api.calendarStoreGetHolidays,
    undefined,
    function* (res) {
      yield put(actions.calendarStoreSetSection({
        holidays: res,
        holidaysLoading: false,
      }));
    },
    function* () {
      yield put(actions.calendarStoreSetSection({
        holidaysLoading: false,
      }));
    },
  );
}

export function* canBeCanceledCalendarStoreGetHolidays(action) {
  const bgCalendarStoreGetHolidays = yield fork(calendarStoreGetHolidays, action.value);
  yield take('CALENDAR_STORE_GET_HOLIDAYS_CANCEL');
  yield cancel(bgCalendarStoreGetHolidays);
}

/* ***************************** calendarStoreChangeDay ********************** */
function* calendarStoreChangeDay(value) {
  const {
    id,
  } = value || {};
  yield put(actions.modalStoreSetSection({
    loading: true,
    loadingText: `${id ? 'Удаляем' : 'Добавляем'} не рабочий день`,
  }));
  yield queryResultAnalysis(
    id ? api.calendarStoreRemoveHoliday : api.calendarStoreSetHoliday,
    id || value,
    function* () {
      yield put(actions.modalStoreSetSection({
        show: false,
      }));
      yield calendarStoreGetHolidays(false);
    },
    function* () {
      yield put(actions.modalStoreSetSection({
        loading: false,
        loadingText: '',
      }));
    },
  );
}

export function* canBeCanceledCalendarStoreChangeDay(action) {
  const bgCalendarStoreChangeDay = yield fork(calendarStoreChangeDay, action.value);
  yield take('CALENDAR_STORE_CHANGE_DAY_CANCEL');
  yield cancel(bgCalendarStoreChangeDay);
}
