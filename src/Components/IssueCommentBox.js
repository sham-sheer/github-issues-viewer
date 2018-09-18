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
    alert('A comment has been submitted: ' + this.state.value);
    event.preventDefault();
    this.postComment();
  }

  postComment = () => {
    if(this.state.value !== '') {
      axios.post(`https://api.github.com/repos/sham-sheer/${this.props.repo}/issues/comments/${this.props.id}`, {
        body: this.state.value
      })
      .then(function (response) {
        console.log(response);
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
