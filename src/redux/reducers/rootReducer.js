import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authStore from './auth/authStore';
import userStore from './user/userStore';
import tokenStore from './token/tokenStore';
import modalStore from './common/modalStore';
import toastsStore from './common/toastsStore';
import settingsStore from './settings/settingsStore';
import reportsStore from './reports/reportsStore';
import reportsGridStore from './reportsGrid/reportsGridStore';
import popUpStore from './common/popUpStore';
import globalStore from './common/globalStore';
import briefcasesStore from './briefcases/briefcasesStore';
import testStore from './test/testStore';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settingsStore,
  reportsStore,
  reportsGridStore,
  authStore,
  userStore,
  tokenStore,
  modalStore,
  toastsStore,
  popUpStore,
  globalStore,
  briefcasesStore,
  testStore,
});

export default rootReducer;
