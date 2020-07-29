import logIn from './auth/auth';
import * as settings from './settings/settings';

const api = {
  logIn,
  ...settings,
};

export default api;
