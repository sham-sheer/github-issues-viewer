import React from 'react';
import { Link } from 'react-router-dom';

const Issue = ({ id, title, user, org, repo }) => {
  //work in progress need to link straight to the issue instead of his profile
  const link = `https://github.com/${user}`;
  const name = <a href={link} target="_blank">{user}</a>;
  return (
    <div>
    <li className="list-group-item">
        <small className="form-text text-muted">#{id} opened by {name}</small>
        <Link to={`/${org}/${repo}/${id}`} >{title}</Link>
    </li>
    </div>
  );
}

export default Issue;
