import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import IssueComments from './IssueComments';
import './IssueDescription.css'


export default class IssueDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : this.props.match.params.id,
      org: this.props.match.params.org,
      repo: this.props.match.params.repo,
      details : [],
      editing: false,
      value: ''
    }
  }

  componentDidMount() {
    this.fetchIssueDetails()
  }

  fetchIssueDetails(number) {
    axios.get(`https://api.github.com/repos/${this.state.org}/${this.state.repo}/issues/${this.state.id}`)
    .then(resp => {
      this.setState({
        details: resp.data,
        value: resp.data.body
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      editing: !this.state.editing,
    })
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const title = "#" + this.state.id + " " +this.state.details.title;
    const text = this.state.value;
    let button;
    let body;
    if (!this.state.editing) {
      button = <a class="button is-warning" onClick={this.handleClick}>Edit</a>;
      body = <ReactMarkdown source={text} />
    } else {
      button = <a class="button is-success" onClick={this.handleClick}>Save</a>
      body = <form>
              <div className="form-group">
                <textarea
                className="form-control"
                rows="3"
                value={this.state.value}
                onChange={this.handleChange}
                placeholder={text}
                />
              </div>
            </form>
    }


    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <h4 className="title is-4">{title}</h4>
        </nav>
        <div id="details-body" className="jumbotron">
          <div className="content">{body}</div>
          <div>{button}</div>
          <div className="jumbotron">
            <h5 className="title is-5">Comments</h5>
            <IssueComments
              id={this.state.id}
              org={this.state.org}
              repo={this.state.repo}
              />
          </div>
        </div>
      </div>
    );
  }

}
