import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import IssuesContainer from './Containers/IssuesContainer';
import IssueDescription from './Containers/IssueDescription';
import IssueLogin from './Components/IssueLogin';
import IssueOAuth from './Containers/IssueOAuth';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';



class App extends Component {

  render() {
    const loggerMiddleware = createLogger();

    const middleware = store => next => action => {
  // Get the state before and after the action was performed
      if (action.type === 'LOG_IN_SUCCESS') {
        window.localStorage.setItem('at', action.accessToken);
      }
      if (action.type === 'LOG_OUT') {
        window.localStorage.setItem('at', '');
      }
      return next(action);
    }

    const apimiddleware = store => next => action => {
      if(action.type === 'GET_ISSUE_BEGIN') {
        asdasddasdasd
      }
    }

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middleware, thunkMiddleware, loggerMiddleware)));
    return (
      <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route path={"/callback"} component={IssueOAuth} />
          <Route exact path={"/login"} component={IssueLogin} />
          <Route exact path={"/home"} render={(props) => <IssuesContainer {...props} />} />
          <Route exact path={"/:org/:repo/:id"} component={IssueDescription} />
        </div>
       </BrowserRouter>
       </Provider>
    );
  }
}

export default App;
