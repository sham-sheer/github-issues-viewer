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
    const password = '892cef7f13188d817dba070ab5f783bd5118d4fd';
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
