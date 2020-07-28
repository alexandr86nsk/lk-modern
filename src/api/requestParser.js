import axios from 'axios';
import qs from './qs';
import store from '../store/store';

/* ********************** token **************** */
const getToken = () => store.getState().tokenStore.token;

/* ******************** queryConfig **************** */
const getQueryConfig = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

const requestParser = async (method, url, data) => {
  try {
    const res = (data || data === 0) ? await axios[method](`${qs}${url}`, data, getQueryConfig()) : await axios[method](`${qs}${url}`, getQueryConfig());
    return res.data;
  } catch (e) {
    if (e.response && e.response.status && e.response.status === 401) {
      store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
    }
    throw e;
  }
};

export default requestParser;
