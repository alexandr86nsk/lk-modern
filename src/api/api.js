import logIn from './auth/auth';
import * as settings from './settings/settings';
import * as zone from './zone/zone';
import * as reports from './reports/reports';
import * as reportsGrid from './reportsGrid/reportsGrid';
import * as calendar from './calendar/calendar';
import * as briefcases from './briefcases/briefcases';
import dadataGetAddress from './dadata/dadata';

const api = {
  logIn,
  dadataGetAddress,
  ...reports,
  ...reportsGrid,
  ...settings,
  ...zone,
  ...calendar,
  ...briefcases,
};

export default api;
