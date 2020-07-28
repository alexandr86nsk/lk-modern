import { put, call } from 'redux-saga/effects';
import actions from '../../actions/actions';

export function* setErrorToast(text) {
  const toast = {
    id: Math.random(),
    color: 'red',
    text,
  };
  yield put(actions.toastsStoreAddToast(toast));
}

export function* setSuccessToast(text) {
  const toast = {
    id: Math.random(),
    color: 'green',
    text,
  };
  yield put(actions.toastsStoreAddToast(toast));
}

export function* queryResultAnalysis(query, value, isSuccessFunc, isErrorFunc) {
  if (query) {
    try {
      const result = (value || value === 0) ? yield call(query, value) : yield call(query);
      let res;
      if (Object.prototype.hasOwnProperty.call(result, 'data')) {
        res = result.data;
      } else {
        res = result;
      }
      if (Object.prototype.hasOwnProperty.call(res, 'errorMessage')) {
        if (res && !res.error) {
          if (isSuccessFunc) {
            yield isSuccessFunc(res);
          }
        } else if (res && res.error) {
          if (isErrorFunc) {
            yield isErrorFunc();
          }
          yield (setErrorToast(res.error));
        } else {
          if (isErrorFunc) {
            yield isErrorFunc();
          }
          yield (setErrorToast('Произошла ошибка при получении данных. Пожалуйста повторите попытку'));
        }
      } else if (isSuccessFunc) {
        yield isSuccessFunc(res);
      }
    } catch (e) {
      if (isErrorFunc) {
        yield isErrorFunc(e);
      }
      yield (setErrorToast('При получении данных произошла ошибка. Пожалуйста повторите попытку'));
    }
  }
}
