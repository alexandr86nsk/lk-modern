import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/colors.scss';
import './static/css/default.scss';
import './static/css/typography.scss';
import '../semantic-ui/semantic.less';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import App from './App';
import history from './history/history';
import store from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
