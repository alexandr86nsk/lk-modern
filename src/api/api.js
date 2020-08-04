import logIn from './auth/auth';
import * as settings from './settings/settings';
import * as zone from './zone/zone';

const api = {
  logIn,
  ...settings,
  ...zone,
};

export default api;
