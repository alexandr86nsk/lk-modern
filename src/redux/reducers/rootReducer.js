import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authStore from './auth/authStore';
import userStore from './user/userStore';
import tokenStore from './token/tokenStore';
import modalStore from './common/modalStore';
import pageControlStore from './common/pageControlStore';
import toastsStore from './common/toastsStore';
import globalStore from './common/globalStore';
import settingsStore from './settings/settingsStore';
import reportsStore from './reports/reportsStore';
import briefcaseListStore from './briefcase/briefcaseListStore';
import briefcaseItemStore from './briefcase/briefcaseItemStore';
import referencesStore from './references/referencesStore';
import testPageStore from './test/testPageStore';
import popUpStore from './common/popUpStore';
import contextMenuStore from './common/contextMenuStore';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settingsStore,
  reportsStore,
  authStore,
  pageControlStore,
  userStore,
  tokenStore,
  globalStore,
  modalStore,
  toastsStore,
  briefcaseListStore,
  briefcaseItemStore,
  referencesStore,
  testPageStore,
  popUpStore,
  contextMenuStore,
});

export default rootReducer;
