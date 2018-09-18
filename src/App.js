import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IssuesContainer from './Components/IssuesContainer';
import IssueDescription from './Components/IssueDescription';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
          <Route exact path={"/"} component={IssuesContainer} />
          <Route exact path={"/:org/:repo/:id"} component={IssueDescription} />
          </Switch>
        </div>
       </BrowserRouter>
    );
  }
}

export default App;
