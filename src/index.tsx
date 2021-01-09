import React from 'react';
import ReactDOM from 'react-dom';
import '@styles-kit/global.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ErrorBoundary } from '@components/UIErrorBoundary';

import { App } from './App';
import { store } from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>,
  document.getElementById('root')
);
