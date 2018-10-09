import React from 'react';
import IssueComment from './IssueComment';


const IssueComments = ({comments = []}) => {
  let issueComments = comments;
  let issueComment = issueComments.map(comment =>
    <IssueComment body={comment.body} user={comment.user.login} />
  );
  return (
    <div>
      <ul className="list-group">
        {issueComment}
      </ul>
      </div>
    )
  }

export default IssueComments;
