import React, { Component } from 'react';
import ReactMarkdown from 'react';
import axios from 'axios';

export default class IssueCommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
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
      axios({
        url: `https://api.github.com/repos/${this.props.org}/${this.props.repo}/issues/${this.props.id}/comments`,
        method: 'post',
        data: {
          body: this.state.value
        },
        auth: {
          username: 'sham-sheer',
          password: '370ca3dcb3715e7fe66f9728f54a54ac5017e29c'
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

  render() {
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
