import * as modal from './common/modalActions';
import * as toasts from './common/toastsActions';
import * as token from './token/tokenActions';
import * as settings from './settings_OLD/settingsActions';
import * as reports from './reports/reportsActions';
import * as user from './user/userActions';
import * as zone from './zone/zoneActions';
import * as popUp from './common/popUpActions';
import * as auth from './auth/authActions';
import * as calendar from './calendar/calendarActions';
import * as global from './common/globalStoreActions';
import * as briefcases from './briefcases/briefcasesActions';

const actions = {
  ...auth,
  ...modal,
  ...zone,
  ...toasts,
  ...token,
  ...settings,
  ...reports,
  ...user,
  ...popUp,
  ...calendar,
  ...global,
  ...briefcases,
};

export default actions;
