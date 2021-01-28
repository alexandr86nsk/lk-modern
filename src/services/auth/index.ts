import { withToken } from '@services/utils';

export type LogInRequestType = {
  login: string;
  password: string;
};

export type createAccountRequestType = {
  login: string;
  password: string;
};

export const logIn = (data: LogInRequestType) => {
  return withToken({
    method: 'post',
    url: 'login',
    data,
  });
};

export const createAccount = (data: createAccountRequestType) => {
  return withToken({
    method: 'post',
    url: 'login',
    data,
  });
};
