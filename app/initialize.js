require('es6-promise').polyfill();

import ReactDOM from 'react-dom';
import React from 'react';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
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
  ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#app')
  );
});
