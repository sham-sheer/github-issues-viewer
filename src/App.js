import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IssuesContainer from './Components/IssuesContainer';
import IssueDescription from './Components/IssueDescription';
import IssueLogin from './Components/IssueLogin';
import IssueOAuth from './Components/IssueOAuth';
import {UserContext} from './Components/user-context';


class App extends Component {
  state = {
    accessToken : localStorage.getItem('at')
  }
  getToken = (value) => {
    this.setState({
      accessToken : value
    })
  }
  render() {
    return (
      <UserContext.Provider value={this.state.accessToken}>
      <BrowserRouter>
        <div>
          <Route path={"/callback"} render={(props) => <IssueOAuth {...props} passToken={this.getToken} />} />
          <Route exact path={"/login"} component={IssueLogin} />
          <Route exact path={"/"} render={(props) => <IssuesContainer {...props} passToken={this.getToken} token={this.state.accessToken}/>} />
          <Route exact path={"/:org/:repo/:id"} render={(props) => <IssueDescription {...props} token={this.state.accessToken} />} />
        </div>
       </BrowserRouter>
       </UserContext.Provider>
    );
  }
}

export default App;
