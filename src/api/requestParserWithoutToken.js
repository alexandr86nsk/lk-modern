import axios from 'axios';
import { qs } from '../constants';
// import store from '../store/store';

/* ********************** token **************** */
// const getToken = () => store.getState().tokenStore.token;

/* ******************** queryConfig **************** */
// const getHeadersAuthorization = () => ({ Authorization: `Bearer ${getToken()}` });

const requestParserWithoutToken = async (props) => {
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
      // ...getHeadersAuthorization(),
      ...headers,
    },
    params,
    ...requestConfig,
  };
  const res = data !== undefined
    ? await axios[method](`${qs}${url}`, data, config)
    : await axios[method](`${qs}${url}`, config);
  const { data: resData } = res || {};
  return resData;
};

export default requestParserWithoutToken;
