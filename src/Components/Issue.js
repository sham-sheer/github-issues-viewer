import React from 'react';
import { NavLink } from 'react-router-dom';
import IssueLabel from './IssueLabel';
import './LoginButton.css';


const Issue = ({ id, title, user, pic, org, repo, labels, filteredValue }) => {
  //work in progress need to link straight to the issue instead of his profile
  const link = `https://github.com/${user}`;
  const name = <a href={link} target="_blank">{user}</a>;
  const profile_image = <figure className="image is-48x48">
                          <img className="is-rounded" src={pic} alt="No Profile Pic" />
                        </figure>;
  let issueLabel = labels.map(label =>
    <IssueLabel name={label.name}
                color={label.color}
                url={label.url}
    />

  );

  var Highlight = require('react-highlighter');

  return (
    <div>
    <li className="list-group-item">
        <div className="level">
          {profile_image}
          <div className="level-item has-text-centered">
            <div>
            <small className="form-text text-muted">#{id} opened by {name}</small>
            <NavLink
              className="google-button" to={`/${org}/${repo}/${id}`} >
              <Highlight search={filteredValue}>{title}</Highlight>
            </NavLink>
            <ul className="list-group">
              {issueLabel}
            </ul>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

export default Issue;
