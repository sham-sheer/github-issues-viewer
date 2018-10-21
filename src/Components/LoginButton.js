import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions';
import { connect } from 'react-redux';
import './LoginButton.css';



class LoginButton extends React.Component{
  render() {
    const { logout } = this.props
    if(localStorage.getItem('at') === '' && this.props.accessToken === '') {
      return (
        <Link className="google-button" to={`/login`} >
          Login with Github
        </Link>

      )
    }
    else {
      return (
        <span className="google-button" onClick={logout}>Log out</span>
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
