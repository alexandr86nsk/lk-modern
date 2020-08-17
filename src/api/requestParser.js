import axios from 'axios';
import qs from './qs';
import store from '../store/store';

/* ********************** token **************** */
const getToken = () => store.getState().tokenStore.token;
const getRefreshToken = () => store.getState().tokenStore.refreshToken;

/* ******************** queryConfig **************** */
const getQueryConfig = (params) => ({ headers: { Authorization: `Bearer ${getToken()}` }, params });

const getErrorCode = (error) => (error && error.response && error.response.status
  ? error.response.status
  : null);

const requestParser = async (props) => {
  const {
    method,
    url,
    data,
    params,
    repeated,
  } = props || {};
  try {
    const res = data !== undefined
      ? await axios[method](`${qs}${url}`, data, getQueryConfig(params))
      : await axios[method](`${qs}${url}`, getQueryConfig(params));
    const { data: resData } = res || {};
    return resData;
  } catch (e) {
    if (getErrorCode(e) === 401) {
      const rToken = getRefreshToken();
      if (rToken) {
        try {
          const refreshRes = await axios.post(`${qs}login/${rToken}/refresh`);
          const {
            data: refreshResData,
          } = refreshRes || {};
          const {
            access_token: token,
            refresh_token: refreshToken,
          } = refreshResData || {};
          if (token && refreshToken) {
            await store.dispatch({ type: 'TOKEN_STORE_SET_SECTION', value: { token, refreshToken } });
            return requestParser({ method, url, data });
          }
          store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
          return null;
        } catch (err) {
          if (getErrorCode(err) === 401) {
            store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
            return null;
          }
          if (getErrorCode(err) === 404) {
            if (!repeated) {
              return requestParser({
                method, url, data, repeated: true,
              });
            }
            store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
            return null;
          }
          throw err;
        }
      } else {
        store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
        return null;
      }
    } else {
      throw e;
    }
  }
};

export default requestParser;
