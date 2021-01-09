import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import { store } from '@src/store';

import { authActions } from '@store/auth';

const API_URL = process?.env?.API_URL;

const ERR_500x = 5;
const ERR_401 = 401;

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_URL,
};

const instance = axios.create(axiosConfig);

function onError(error: AxiosError) {
  const { message, response } = error || {};
  let errorData = { message };

  if (error.response) {
    const { data, status } = response || {};

    const is500xErrors = new RegExp(`^${ERR_500x}`).test(String(status));

    if (is500xErrors) {
      errorData.message = 'Ошибка сервера';
    } else if (status === ERR_401) {
      store.dispatch(authActions.clear());
    } else {
      errorData = data;
    }
  }

  return Promise.reject({
    statusCode: error?.response?.status || null,
    data: errorData,
  });
}

export function request<T>(options: AxiosRequestConfig, token?: string): Promise<T> {
  const headers = options?.headers || {};
  if (token && headers) {
    headers.Authorization = `Bearer ${token}`;
  }

  function onSuccess(response: AxiosResponse) {
    return response?.data;
  }

  return instance({ ...options, headers })
    .then(onSuccess)
    .catch(onError);
}

export function withToken(options: AxiosRequestConfig) {
  const token = store.getState()?.auth?.token || '';
  return request(options, token);
}
