import React from 'react';
import querystring from 'query-string';
import axios from 'axios';
import { Redirect } from 'react-router';



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
        const AUTH_TOKEN = resp.data.substring(13, 53);
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      })
      .catch(function (error) {
        console.log(error);
      })

  }

  render() {
      if(this.state.loggedIn) {
        return (
            <Redirect to="/home"/>
        )
      }
      else {
        return (
          <div className="pageloader"><span className="title">Loading</span></div>
        )
      }

  }
}
