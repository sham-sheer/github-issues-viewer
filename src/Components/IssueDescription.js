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
      details : []
    }
  }

  componentDidMount() {
    this.fetchIssueDetails()
  }

  fetchIssueDetails(number) {
    axios.get(`https://api.github.com/repos/${this.state.org}/${this.state.repo}/issues/${this.state.id}`)
    .then(resp => {
      this.setState({ details: resp.data })
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    const title = "#" + this.state.id + " " +this.state.details.title;
    const body = this.state.details.body;

    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <h4 className="title is-4">{title}</h4>
        </nav>
        <div id="details-body" className="jumbotron">
          <ReactMarkdown className="content" source={body} />
          <div className="jumbotron">
            Comments:
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
