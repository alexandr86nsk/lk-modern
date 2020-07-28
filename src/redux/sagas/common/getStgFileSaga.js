import {
  call, cancel, fork, put, take,
} from 'redux-saga/effects';
import actions from '../../actions/actions';
import api from '../../../api/api';
import arrayBufferToBase64 from '../../../components/utilities/arrayBufferToBase64';
import { setErrorToast } from './globalSaga';


function* getStgFile(action) {
  yield put(actions.filePreviewStoreSetSection({
    file: '',
    show: true,
    loading: true,
    ...action.value,
  }));
  try {
    const res = yield call(api.getStgFile, action.value.id);
    yield put(actions.filePreviewStoreSetSection({
      loading: false,
      file: arrayBufferToBase64(res.data),
    }));
  } catch (e) {
    yield put(actions.filePreviewStoreClear());
    yield setErrorToast('При загрузке файла произошла ошибка. Пожалуйста повторите попытку');
  }
}

export default function* canBeCanceledGetStgFile(action) {
  const bgGetStgFile = yield fork(getStgFile, action);
  yield take('GET_STG_FILE_CANCEL');
  yield cancel(bgGetStgFile);
}
