import React from 'react';

const IssueLabel = ({ name, color, url }) => {
  const styles = {
   backgroundColor: "#" + color,
  }

  return (
    <div>
      <li style={styles} id="label-box" className="list-group-item">
          <a target="_blank" href={url}>
            <font color="white">{name}</font>
            </a>
      </li>
    </div>
  );
}

export default IssueLabel;
