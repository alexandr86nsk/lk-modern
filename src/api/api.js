import logIn from './auth/auth';
import * as settings from './settings/settings';
import * as zone from './zone/zone';
import * as reports from './reports/reports';
import dadataGetAddress from './dadata/dadata';

const api = {
  logIn,
  dadataGetAddress,
  ...reports,
  ...settings,
  ...zone,
};

export default api;
