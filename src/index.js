import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bulma/css/bulma.css';
import '../node_modules/bulma-pageloader/dist/css/bulma-pageloader.min.css';
import './bower_components/bootstrap-social/bootstrap-social.css';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
//import { getIssue, getComments, postComment } from './redux/actions';


const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, loggerMiddleware)));


store.getState();
store.subscribe(() =>
  console.log(store.getState())
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('root'));
