import React, { Component } from 'react';
import QueryString from 'query-string';


export default class IssueLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      code: '',
    }
  }

  requestIdentity = () => {
    /*axios({
      url: `https://github.com/login.oauth/authorize`,
      method: 'get',
      data: {
        client_id: 'd14c97834e4fa5fce69b',
      }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });*/
  let url = `https://github.com/login/oauth/authorize`;

  fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type':'application/json'},
    data: JSON.stringify({
      client_id: 'd14c97834e4fa5fce69b'
    })
  })
    .then(response => {
      console.log(response);
   })
  }
  handleClick = () => {
    this.requestIdentity();
  }


  render() {
    const query = QueryString.stringify({
      client_id : 'd14c97834e4fa5fce69b',
      redirect_uri : 'http://localhost:3000/callback',
      state : 'hello',
      scope : 'user email'
    })
    return(
      <div>
          <a class="btn btn-block btn-social btn-github" href={`https://github.com/login/oauth/authorize?${query}`}>
            <span class="fa fa-github"></span>
              Sign in with Github
            </a>
      </div>
    );
  }
}
