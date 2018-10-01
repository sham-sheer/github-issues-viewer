import React from 'react';
import querystring from 'query-string';
import axios from 'axios';
import IssueLogin from './IssueLogin';
import { Route, Redirect } from 'react-router';

export default class IssueOAuth extends React.Component {
  constructor() {
    super();
    this.state = {
      accessToken : '',
      loggedIn : false
    }
  }
  componentDidMount() {
    this.redirect();
  }

  component

  redirect() {
    const string = this.props.location.search;
    const code = string.substring(6, 26);
    const query = querystring.stringify({
      client_id : 'd14c97834e4fa5fce69b',
      client_secret : 'b789003e3a10a68fabb07c4bece604d88255193e',
      code,
      redirect_uri : 'http://localhost:3000/callback',
      state : 'hello'
    })
    axios({
      url: `https://github.com/login/oauth/access_token?${query}`,
      method: 'post'
      })
      .then(resp => {
        console.log(resp);
        this.setState({
          accessToken : resp.data.substring(13, 53),
          loggedIn : true
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  render() {
    if(this.state.loggedIn) {
      return (
          <Redirect to="/"/>
      )
    }
    else {
      return (
        <div>Loading ...</div>
      )
    }

  }
}
