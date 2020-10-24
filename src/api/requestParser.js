import axios from 'axios';
import { qs } from '../constants';
import store from '../store/store';

/* ********************** token **************** */
const getToken = () => store.getState().tokenStore.token;

/* ******************** queryConfig **************** */
const getHeadersAuthorization = () => ({ Authorization: `Bearer ${getToken()}` });

/* ******************** getErrorCode **************** */
const getErrorCode = (error) => (error && error.response && error.response.status
  ? error.response.status
  : null);

const requestParser = async (props) => {
  const {
    method,
    url,
    data,
    params,
    headers,
    requestConfig,
  } = props || {};
  const config = {
    headers: {
      ...getHeadersAuthorization(),
      ...headers,
    },
    params,
    ...requestConfig,
  };
  try {
    const res = data !== undefined
      ? await axios[method](`${qs}${url}`, data, config)
      : await axios[method](`${qs}${url}`, config);
    const { data: resData } = res || {};
    return resData;
  } catch (err) {
    if (getErrorCode(err) === 401) {
      store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
      return null;
    }
    throw err;
  }
};

export default requestParser;
