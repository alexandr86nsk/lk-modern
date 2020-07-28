import * as modal from './common/modalActions';
import * as toasts from './common/toastsActions';
import * as pageControlActions from './common/pageControlActions';
import * as token from './token/tokenActions';
import * as briefcase from './briefcase/briefcaseActions';
import * as settings from './settings/settingsActions';
import * as reports from './reports/reportsActions';
import * as user from './user/userActions';
import * as global from './common/globalActions';
import * as references from './references/referencesActions';
import * as test from './test/testActions';
import * as contextMenuActions from './common/contextMenuActions';
import * as popUpActions from './common/popUpActions';

const actions = {
  ...modal,
  ...toasts,
  ...pageControlActions,
  ...token,
  ...briefcase,
  ...settings,
  ...reports,
  ...user,
  ...global,
  ...references,
  ...test,
  ...contextMenuActions,
  ...popUpActions,
};

export default actions;
