import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IssuesContainer from './Components/IssuesContainer';
import IssueDescription from './Components/IssueDescription';
import IssueLogin from './Components/IssueLogin';
import IssueOAuth from './Components/IssueOAuth';
import {UserContext} from './Components/user-context';


class App extends Component {
  render() {
    const username = 'sham-sheer';
    const password = '370ca3dcb3715e7fe66f9728f54a54ac5017e29c';
    return (
      <UserContext.Provider value={{username, password}}>
      <BrowserRouter>
        <div>
          <Route path={"/callback"} component={IssueOAuth} />
          <Route exact path={"/login"} component={IssueLogin} />
          <Route exact path={"/"} render={(props) => <IssuesContainer {...props} />} />
          <Route exact path={"/:org/:repo/:id"} component={IssueDescription} />
        </div>
       </BrowserRouter>
       </UserContext.Provider>
    );
  }
}

export default App;
