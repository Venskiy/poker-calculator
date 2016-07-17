require('es6-promise').polyfill();
require('whatwg-fetch')

import 'style/app.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import 'whatwg-fetch';
import 'jquery';
import toastr from 'toastr';

import rootReducer from 'reducers/rootReducer';
import initialState from 'reducers/initialState';
import App from 'container/App';

toastr.options.closeButton = true;
toastr.options.preventDuplicates = true;
toastr.options.timeOut =1300;

const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

document.addEventListener('DOMContentLoaded', () => {
  const el = document.createElement('div');
  el.id = 'app';
  document.body.appendChild(el);
  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    el
  );
});
