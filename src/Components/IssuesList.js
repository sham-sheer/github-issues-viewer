import React, { Component } from 'react';
import Issue from './Issue';


class IssuesList extends Component {
  render() {
    const results = this.props.data;
    const org = this.props.org;
    const repo = this.props.repo;

    let issue = results.map(issue =>
      <Issue title={issue.title}
              id={issue.number}
              user={issue.user.login}
              org={org}
              repo={repo}
              labels={issue.labels}

      />

    );
    return(
      <div>
        <ul className="list-group">
          {issue}
        </ul>
        </div>
    );
  }
}

export default IssuesList;
