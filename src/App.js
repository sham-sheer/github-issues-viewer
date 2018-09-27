import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IssuesContainer from './Components/IssuesContainer';
import IssueDescription from './Components/IssueDescription';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path={"/"} render={(props) => <IssuesContainer {...props} />} />
          <Route exact path={"/:org/:repo/:id"} component={IssueDescription} />
        </div>
       </BrowserRouter>
    );
  }
}

export default App;
