import { put, call } from 'redux-saga/effects';
import actions from '../../actions/actions';

export function* setErrorToast(text) {
  const toast = {
    id: Math.random(),
    type: 'error',
    text,
  };
  yield put(actions.toastsStoreAddToast(toast));
}

export function* setSuccessToast(text) {
  const toast = {
    id: Math.random(),
    type: 'success',
    text,
  };
  yield put(actions.toastsStoreAddToast(toast));
}

export function* queryResultAnalysis(query, value, isSuccessFunc, isErrorFunc, hideErrorToast) {
  if (query) {
    try {
      const result = value !== undefined ? yield call(query, value) : yield call(query);
      let res;
      if (Object.prototype.hasOwnProperty.call(result, 'data')) {
        res = result.data;
      } else {
        res = result;
      }
      if (Object.prototype.hasOwnProperty.call(res, 'errors')) {
        if (res && !res.errors) {
          if (isSuccessFunc) {
            yield isSuccessFunc(res);
          }
        } else if (res && res.errors) {
          if (isErrorFunc) {
            yield isErrorFunc();
          }
          yield (!hideErrorToast && setErrorToast(res.errors));
        } else {
          if (isErrorFunc) {
            yield isErrorFunc();
          }
          yield (!hideErrorToast && setErrorToast('Произошла ошибка при получении данных. Пожалуйста повторите попытку'));
        }
      } else if (isSuccessFunc) {
        yield isSuccessFunc(res);
      }
    } catch (e) {
      if (isErrorFunc) {
        yield isErrorFunc(e);
      }
      const errors = e && e.response && e.response.data && e.response.data.errors
        ? e.response.data.errors
        : 'Неизвестная ошибка';
      yield (!hideErrorToast && setErrorToast(errors));
    }
  }
}
