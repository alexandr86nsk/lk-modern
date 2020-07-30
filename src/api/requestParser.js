import axios from 'axios';
import qs from './qs';
import store from '../store/store';

/* ********************** token **************** */
const getToken = () => store.getState().tokenStore.token;
const getRefreshToken = () => store.getState().tokenStore.refreshToken;

/* ******************** queryConfig **************** */
const getQueryConfig = () => ({ headers: { Authorization: `Bearer ${getToken()}` } });

const requestParser = async (method, url, data) => {
  try {
    const res = (data || data === 0)
      ? await axios[method](`${qs}${url}`, data, getQueryConfig())
      : await axios[method](`${qs}${url}`, getQueryConfig());
    return res.data;
  } catch (e) {
    if (e.response && e.response.status && e.response.status === 401) {
      const rToken = getRefreshToken();
      if (rToken) {
        try {
          const newData = await axios.post(`${qs}login/${rToken}/refresh`);
          if (newData && newData.data && newData.data.access_token) {
            const {
              access_token: token,
              refresh_token: refreshToken,
            } = newData.data || {};
            await store.dispatch({ type: 'TOKEN_STORE_SET_SECTION', value: { token, refreshToken } });
            try {
              const res = (data || data === 0)
                ? await axios[method](`${qs}${url}`, data, { headers: { Authorization: `Bearer ${newData.data.access_token}` } })
                : await axios[method](`${qs}${url}`, { headers: { Authorization: `Bearer ${newData.data.access_token}` } });
              return res.data;
            } catch (error) {
              if (error.response && error.response.status && error.response.status === 401) {
                store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
              } else {
                throw error;
              }
            }
          } else {
            store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
          }
        } catch (err) {
          if (err.response
            && err.response.status
            && (err.response.status === 401 || err.response.status === 404)
          ) {
            store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
          } else {
            throw err;
          }
        }
      } else {
        store.dispatch({ type: 'TOKEN_STORE_CLEAR' });
      }
    }
    throw e;
  }
};

export default requestParser;
