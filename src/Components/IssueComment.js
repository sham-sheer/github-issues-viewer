import React from 'react';
import ReactMarkdown from 'react-markdown';
import './IssueComment.css';


const IssueComment = ({ body, user }) => {
  return (
    <div>
      <li className="list-group-item">
        <div id="comment-user">
          <small id="commented" className="form-text text-muted">
            {user} commented:
          </small>
        </div>
        <ReactMarkdown source={body} />
        </li>
    </div>
  );
}

export default IssueComment;
