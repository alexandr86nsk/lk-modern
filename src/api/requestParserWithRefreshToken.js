import axios from 'axios';
import { qs } from '../constants';
import store from '../store/store';

/* ********************** token **************** */
const getToken = () => store.getState().tokenStore.token;
const getRefreshToken = () => store.getState().tokenStore.refreshToken;

/* ******************** queryConfig **************** */
const getHeadersAuthorization = () => ({ Authorization: `Bearer ${getToken()}` });

const getErrorCode = (error) => (error && error.response && error.response.status
  ? error.response.status
  : null);

const requestParserWithRefreshToken = async (props) => {
  const {
    method,
    url,
    data,
    params,
    headers,
    requestConfig,
    repeated,
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
            return requestParserWithRefreshToken({
              method,
              url,
              data,
              params,
              headers,
              requestConfig,
            });
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
              return requestParserWithRefreshToken({
                method,
                url,
                data,
                params,
                headers,
                requestConfig,
                repeated: true,
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

export default requestParserWithRefreshToken;
