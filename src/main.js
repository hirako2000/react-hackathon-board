import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery/src/core';
import semanticUI from 'semantic-ui/dist/semantic';
import semanticUIcss from 'semantic-ui/dist/semantic.min.css';
// Using hashHistory as BrowserHistory appears to be buggy with some version of react-router
import createBrowserHistory from 'history/lib/createHashHistory';
import { useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import makeRoutes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';
import i18n from './config/i18n';

// Configure history for react-router
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__,
  queryKey: false
});

// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store);

i18n.init();

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} store={store} />,
  document.getElementById('root')
);
