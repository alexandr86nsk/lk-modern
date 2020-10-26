import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../redux/reducers/rootReducer';
import rootSaga from '../redux/sagas/rootSaga';
import history from '../history';

const preloadedState = localStorage.getItem('token') ? { tokenStore: { token: localStorage.getItem('token') } } : {};
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer(history),
  preloadedState,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  localStorage.setItem('token', JSON.stringify(store.getState().tokenStore.token));
});

export default store;
