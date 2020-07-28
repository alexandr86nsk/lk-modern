import * as auth from './auth/auth';
import * as briefcase from './briefcase/briefcase';
import * as settings from './settings/settings';
import * as reports from './reports/reports';
import * as references from './references/references';
import * as test from './test/test';

const api = {
  ...auth,
  ...briefcase,
  ...settings,
  ...reports,
  ...references,
  ...test,
};

export default api;
