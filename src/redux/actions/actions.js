import * as modal from './common/modalActions';
import * as toasts from './common/toastsActions';
import * as token from './token/tokenActions';
import * as settings from './settings/settingsActions';
import * as reports from './reports/reportsActions';
import * as user from './user/userActions';
import * as zone from './zone/zoneActions';
import * as popUpActions from './common/popUpActions';
import * as authActions from './auth/authActions';

const actions = {
  ...authActions,
  ...modal,
  ...zone,
  ...toasts,
  ...token,
  ...settings,
  ...reports,
  ...user,
  ...popUpActions,
};

export default actions;
