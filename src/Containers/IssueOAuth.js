import React from 'react';
import querystring from 'query-string';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { login } from '../redux/actions';


class IssueOAuth extends React.Component {
  componentDidMount() {
    const { login } = this.props;
    const string = this.props.location.search;
    const code = string.substring(6, 26);
    const query = querystring.stringify({
      client_id : 'd14c97834e4fa5fce69b',
      client_secret : 'b789003e3a10a68fabb07c4bece604d88255193e',
      code,
      redirect_uri : 'http://localhost:3000/callback',
      state : 'hello'
    });
    login(code, query);
  }

  render() {
      if(this.props.accessToken !== '') {
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

const mapStateToProps = state => {
  return {
    accessToken: state.login.accessToken,
  }
}

//const mapDispatchToProps = { getIssue, getComments, postComment }

const mapDispatchToProps = dispatch => ({
  login: (code, query) => dispatch(login(code, query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(IssueOAuth)
