import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';

const preloadedState = localStorage.getItem('token')
  ? { auth: { token: localStorage.getItem('token') || undefined } }
  : {};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
  preloadedState,
});

export type Store = typeof store;

store.subscribe(() => {
  localStorage.setItem('token', store.getState()?.auth?.token || '');
});

sagaMiddleware.run(rootSaga);
