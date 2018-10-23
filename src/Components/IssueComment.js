import React from 'react';
import ReactMarkdown from 'react-markdown';
import './IssueComment.css';


const IssueComment = ({ body, user }) => {
  return (
    <div className="comment">
      <li className="list-group-item">
        <div id="comment-user">
          <small id="commented" className="form-text text-muted">
            {user} commented:
          </small>
        </div>
        <ReactMarkdown source={body} className="commentBody" />
        </li>
    </div>
  );
}

export default IssueComment;
