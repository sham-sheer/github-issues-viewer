import React, { Component } from 'react';
import Issue from './Issue';


class IssuesList extends Component {
  render() {
    const results = this.props.data;
    const org = this.props.org;
    const repo = this.props.repo;
    const filteredValue = this.props.filteredValue;

    let issue = results.map(issue =>
      <Issue title={issue.title}
              id={issue.number}
              userName={issue.user.login}
              pic={issue.user.avatar_url}
              org={org}
              repo={repo}
              labels={issue.labels}
              filteredValue={filteredValue}
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
