import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import IssueComments from '../Components/IssueComments';
import IssueCommentBox from '../Components/IssueCommentBox';
import './IssueDescription.css';
import { connect } from 'react-redux';
import { getIssue, getComments, postComment, insertComment } from '../redux/actions';



class IssueDescription extends Component {
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
    const body = this.props.commentValue
    postComment(org, repo, id, body);
  }

  render() {
    const title = "#" + this.props.match.params.id + " " +this.props.issue.title;
    const text = this.props.issue.body;
    const comments = this.props.comments;
    let body;
    body = <ReactMarkdown source={text} />
    return (
      <div className="container">
        <nav className="navbar navbar-light bg-light">
          <h4 className="title is-4">{title}</h4>
        </nav>
        <div id="details-body" className="jumbotron">
          <div className="content">{body}</div>
          <IssueComments comments = {comments}/>
          <IssueCommentBox
            org={this.props.match.params.org}
            repo={this.props.match.params.repo}
            id={this.props.match.params.id}
            change={this.props.handleCommentChange}
            commentValue={this.props.commentValue}
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
    comments: state.comments.comments,
    commentValue: state.comments.insertComment
  }
}

//const mapDispatchToProps = { getIssue, getComments, postComment }

const mapDispatchToProps = dispatch => ({
  getIssue: (org, repo, id) => dispatch(getIssue(org, repo, id)),
  getComments: (org, repo, id) => dispatch(getComments(org, repo, id)),
  postComment: (org, repo, id, body) => dispatch(postComment(org, repo, id, body)),
  handleCommentChange: event => dispatch(insertComment(event.target.value))
})

export default connect(mapStateToProps, mapDispatchToProps)(IssueDescription)
