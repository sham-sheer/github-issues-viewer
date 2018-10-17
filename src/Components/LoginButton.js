import React from 'react';
import {Redirect} from 'react-router';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions';
import { connect } from 'react-redux';


class LoginButton extends React.Component{
  render() {
    const { logout } = this.props
    if(localStorage.getItem('at') === '' && this.props.accessToken === '') {
      return (
        <Link to={`/login`} >
          <a className="button is-primary">Login with Github</a>
        </Link>

      )
    }
    else {
      return (
        <a className="button is-danger" onClick={logout}>Log out</a>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.login.accessToken
  }
}

const mapDispatchToProps = { logout }

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
