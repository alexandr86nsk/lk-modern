import {
  call, put, fork, take, cancel,
} from 'redux-saga/effects';
import saveAs from 'file-saver';
import moment from 'moment';
import api from '../../../api/api';
import actions from '../../actions/actions';
import { queryResultAnalysis } from '../common/globalSaga';
import ratingReportBySettlementsFilterTemplate
  from '../../../containers/ReportsPage/tabs/RatingReportBySettlementsTab/settings';
import operationalReportFilterTemplate from '../../../containers/ReportsPage/tabs/OperationalReportTab/settings';

const getReportFileName = (name, obj, objVar) => {
  if (objVar && Array.isArray(objVar)) {
    let str = name;
    objVar.forEach((v) => {
      const {
        title,
        dataKey,
        type,
      } = v || {};
      const titleValue = title.replace(/\s+/g, '_').trim();
      /* if (obj[dataKey] && obj[dataKey] !== 0 && type !== 'datePicker') {
        str = `${str}_${titleValue}(${obj[dataKey]})`;
      } */
      if (obj[dataKey] && obj[dataKey] !== 0 && type === 'datePicker') {
        moment.locale('ru');
        const dateValue = moment(obj[dataKey]).format('L').replace(/[.]/g, '_');
        str = `${str}_${titleValue}(${dateValue})`;
      }
    });
    return str;
  }
  return '';
};

/* ***************************** reportsStoreGetRatingReportBySettlements ********************** */
function* reportsStoreGetRatingReportBySettlements(value) {
  yield put(actions.reportsStoreSetSection({
    tryGetRatingReportBySettlements: true,
  }));
  yield queryResultAnalysis(
    api.reportsStoreGetRatingReportBySettlements,
    value,
    function* (res) {
      const blob = new Blob(
        [res],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      );
      /* const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank'); */
      const fileName = getReportFileName(
        'Рейтинговый_отчёт_по_населённым_пунктам',
        value,
        operationalReportFilterTemplate,
      );
      saveAs(blob, fileName);
      yield put(actions.reportsStoreSetSection({
        tryGetRatingReportBySettlements: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        tryGetRatingReportBySettlements: false,
      }));
    },
  );
}

export function* canBeCanceledReportsStoreGetRatingReportBySettlements(action) {
  const bgReportsStoreGetRatingReportBySettlements = yield fork(
    reportsStoreGetRatingReportBySettlements,
    action.value,
  );
  yield take('REPORTS_STORE_GET_RATING_REPORT_BY_SETTLEMENTS_CANCEL');
  yield cancel(bgReportsStoreGetRatingReportBySettlements);
}

/* ***************************** reportsStoreGetOperationalReport ********************** */
function* reportsStoreGetOperationalReport(value) {
  yield put(actions.reportsStoreSetSection({
    tryGetOperationalReport: true,
  }));
  yield queryResultAnalysis(
    api.reportsStoreGetOperationalReport,
    value,
    function* (res) {
      const blob = new Blob(
        [res],
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      );
      /* const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, '_blank'); */
      const fileName = getReportFileName(
        'Операционный_отчет',
        value,
        ratingReportBySettlementsFilterTemplate,
      );
      saveAs(blob, fileName);
      yield put(actions.reportsStoreSetSection({
        tryGetOperationalReport: false,
      }));
    },
    function* () {
      yield put(actions.reportsStoreSetSection({
        tryGetOperationalReport: false,
      }));
    },
  );
}

export function* canBeCanceledReportsStoreGetOperationalReport(action) {
  const bgReportsStoreGetOperationalReport = yield fork(
    reportsStoreGetOperationalReport,
    action.value,
  );
  yield take('REPORTS_STORE_GET_OPERATIONAL_REPORT_CANCEL');
  yield cancel(bgReportsStoreGetOperationalReport);
}
