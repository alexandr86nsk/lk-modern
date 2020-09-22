import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import authStore from './auth/authStore';
import userStore from './user/userStore';
import tokenStore from './token/tokenStore';
import modalStore from './common/modalStore';
import toastsStore from './common/toastsStore';
import settingsStore from './settings/settingsStore';
import reportsStore from './reports/reportsStore';
import zoneStore from './zone/zoneStore';
import popUpStore from './common/popUpStore';
import calendarStore from './calendar/calendarStore';
import globalStore from './common/globalStore';

const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  settingsStore,
  reportsStore,
  authStore,
  userStore,
  tokenStore,
  modalStore,
  toastsStore,
  popUpStore,
  zoneStore,
  calendarStore,
  globalStore,
});

export default rootReducer;
