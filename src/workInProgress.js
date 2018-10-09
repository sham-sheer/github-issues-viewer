import React, { Component } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import IssueComments from '../Components/IssueComments';
import IssueCommentBox from '../Components/IssueCommentBox';
import './IssueDescription.css';
import { connect } from 'react-redux';
import { getIssue, getComments, postComment } from '../redux/actions';



class IssueDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: '',
      comments : [],
      commentValue : ''
    }
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    const org = this.props.match.params.org;
    const repo =  this.props.match.params.repo;
    const { getIssue, getComments } = this.props;
    getIssue(org, repo, id);
    getComments(org, repo, id);
  }

  handleCommentBoxChange = (event) => {
    this.setState({
      commentValue : event.target.value
    })
  }

  handleCommentBoxSubmit = (event) => {
    event.preventDefault();
    const { postComment } = this.props;
    const id = this.props.match.params.id;
    const org = this.props.match.params.org;
    const repo =  this.props.match.params.repo;
    const body = this.state.commentValue
    postComment(org, repo, id, body);
  }

  patchIssueDetails(number) {
    axios({
      url: `https://api.github.com/repos/${this.props.match.params.org}/${this.props.match.params.repo}/issues/${this.props.match.params.id}/`,
      method: 'patch',
      data: {
        title: this.props.issue.title,
        body: this.state.value,
        assignees: this.props.issue.assignees,
        milestone: this.props.issue.milestone,
        state: this.props.issue.state,
        labels: this.props.issue.labels
      },
      auth: {
        username: 'sham-sheer',
        password: '892cef7f13188d817dba070ab5f783bd5118d4fd'
      }
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      editing: !this.state.editing,
    });
    this.patchIssueDetails();
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    const title = "#" + this.props.match.params.id + " " +this.props.issue.title;
    const text = this.props.issue.body;
    const comments = this.props.comments;
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
          <IssueComments comments = {comments}/>
          <IssueCommentBox
            org={this.props.match.params.org}
            repo={this.props.match.params.repo}
            id={this.props.match.params.id}
            change={this.handleCommentBoxChange}
            commentValue={this.state.commentValue}
            submitComment={this.handleCommentBoxSubmit}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    issue: state.issue.issue,
    comments: state.comments.comments
  }
}

const mapDispatchToProps = { getIssue, getComments, postComment }

export default connect(mapStateToProps, mapDispatchToProps)(IssueDescription)
