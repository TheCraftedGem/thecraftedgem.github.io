import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './App';


import { createStore,  applyMiddleware } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';

import 'semantic-ui-css/semantic.min.css'


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
