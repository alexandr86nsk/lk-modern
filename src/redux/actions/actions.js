import * as modal from './common/modalActions';
import * as toasts from './common/toastsActions';
import * as token from './token/tokenActions';
import * as settings from './settings/settingsActions';
import * as reports from './reports/reportsActions';
import * as reportsGrid from './reportsGrid/reportsGridActions';
import * as user from './user/userActions';
import * as popUp from './common/popUpActions';
import * as auth from './auth/authActions';
import * as global from './common/globalStoreActions';
import * as briefcases from './briefcases/briefcasesActions';
import * as test from './test/testActions';

const actions = {
  ...auth,
  ...modal,
  ...toasts,
  ...token,
  ...settings,
  ...reports,
  ...reportsGrid,
  ...user,
  ...popUp,
  ...global,
  ...briefcases,
  ...test,
};

export default actions;
