import React from 'react';
import {render} from 'react-dom';
import { Router } from "react-router-dom";
import {createBrowserHistory} from 'history'

import { applyMiddleware, compose, createStore } from 'redux';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { rootReducer } from './redux/rootReducer';

import App from './App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap';

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  )
));

const history = createBrowserHistory()

const app = (
  <Provider store={store}>
    <React.StrictMode>
      <Router history={history}>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
)

render(
  app,
  document.getElementById('app')
);

serviceWorker.unregister();
