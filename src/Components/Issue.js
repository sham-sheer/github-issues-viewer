import React from 'react';
import { Link } from 'react-router-dom';
import IssueLabel from './IssueLabel';

const Issue = ({ id, title, user, pic, org, repo, labels }) => {
  //work in progress need to link straight to the issue instead of his profile
  const link = `https://github.com/${user}`;
  const name = <a href={link} target="_blank">{user}</a>;
  const profile_image = <figure className="image is-48x48">
                          <img className="is-rounded" src={pic} />
                        </figure>;
  let issueLabel = labels.map(label =>
    <IssueLabel name={label.name}
                color={label.color}
                url={label.url}
    />

  );

  return (
    <div>
    <li className="list-group-item">
        <div className="level">
          {profile_image}
          <div className="level-item has-text-centered">
            <div>
            <small className="form-text text-muted">#{id} opened by {name}</small>
            <Link to={`/${org}/${repo}/${id}`} >{title}</Link>
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
