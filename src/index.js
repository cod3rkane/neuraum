import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';

import { Routes } from './Routes';
import * as serviceWorker from './serviceWorker';
import Store from './store/Store';

import './assets/css/index.scss';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={Store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
