import { withToken } from '@services/utils';

export type LogInRequestType = {
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
