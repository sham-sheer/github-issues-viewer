import React, { Component } from 'react';
import ReactMarkdown from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router';

export default class IssueCommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      redirect: false
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.postComment();
  }

  postComment = () => {
    if(this.state.value !== '') {
      debugger
      axios({
        url: `https://api.github.com/repos/${this.props.org}/${this.props.repo}/issues/${this.props.id}/comments`,
        method: 'post',
        data: {
          body: this.state.value
        },
        headers: {
          Authorization: `Bearer ${this.props.token}`
        }
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  redirectToLogin = () => {
    this.setState({
      redirect : true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }


  render() {
    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

    const buttonsInstance = (
      <div className="well" style={wellStyles}>
        {this.renderRedirect()}
        <Button bsStyle="primary" onClick={this.redirectToLogin} bsSize="large" block>
          Login to Comment
        </Button>
      </div>
    );
    if(this.props.token === null) {
      return (
        <div>{buttonsInstance}</div>
      )
    }
    else {
      return(
       <div className="container-fluid">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Comment here:</label>
              <textarea
                className="form-control"
                rows="3"
                value={this.state.value}
                onChange={this.handleChange}
                />
          </div>
          <input
            type="submit"
            value="Submit"
            className="btn btn-outline-dark col-sm form-group mb-2" />
        </form>
        </div>
      );
    }
  }
}
