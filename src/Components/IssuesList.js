import React from 'react';
import Issue from './Issue';


const IssuesList = ({ data, org, repo, filteredValue }) => {
  let issue = data.map(issue =>
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

export default IssuesList;
