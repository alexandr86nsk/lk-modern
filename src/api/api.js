import logIn from './auth/auth';
import * as settings from './settings/settings';
import * as zone from './zone/zone';
import dadataGetAddress from './dadata/dadata';

const api = {
  logIn,
  dadataGetAddress,
  ...settings,
  ...zone,
};

export default api;
