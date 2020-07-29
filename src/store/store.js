import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../redux/reducers/rootReducer';
import rootSaga from '../redux/sagas/rootSaga';
import history from '../history/history';

const preloadedState = localStorage.getItem('tokenStore') ? { tokenStore: JSON.parse(localStorage.getItem('tokenStore')) } : {};
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
  localStorage.setItem('tokenStore', JSON.stringify(store.getState().tokenStore));
});

export default store;
