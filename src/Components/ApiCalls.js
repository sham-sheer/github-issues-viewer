import React from 'react';
import axios from 'axios';

function getComments(org, repo, id) {
  axios.get(`https://api.github.com/repos/${org}/${repo}/issues/${id}/comments`)
  .then(resp => {
    const data = resp.data;
    return data;
  })
  .catch(error => {
    return error;
  })
}

export default getComments;
