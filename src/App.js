import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import IssuesContainer from './Containers/IssuesContainer';
import IssueDescription from './Containers/IssueDescription';
import IssueLogin from './Components/IssueLogin';
import IssueOAuth from './Components/IssueOAuth';
import AccessContext from './Components/IssueOAuth';



class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Redirect exact from='/' to='/home'/>
          <Route path={"/callback"} component={IssueOAuth} />
          <Route exact path={"/login"} component={IssueLogin} />
          <Route exact path={"/home"} render={(props) => <IssuesContainer {...props} />} />
          <Route exact path={"/:org/:repo/:id"} component={IssueDescription} />
        </div>
       </BrowserRouter>
    );
  }
}

export default App;
