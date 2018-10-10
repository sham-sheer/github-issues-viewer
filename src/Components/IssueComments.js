import React, { Component } from 'react';
import axios from 'axios';
import IssueComment from './IssueComment';
import IssueCommentBox from './IssueCommentBox';
import ApiCalls from './ApiCalls';
import {UserContext} from './user-context';


export default class IssueComments extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/repos/${this.props.org}/${this.props.repo}/issues/${this.props.id}/comments`)
    .then(resp => {
      this.setState({ comments: resp.data });
    })
    .catch(error => {
      console.log(error);
    })

  }

  render() {
      let issueComment = this.state.comments.map(comment =>
        <IssueComment body={comment.body} user={comment.user.login} />
      );
      return (
        <div>
          <ul className="list-group">
            {issueComment}
          </ul>
          <div className="jumbotron">
            <UserContext.Consumer>
              {value =>
                <IssueCommentBox
                  user={value.username}
                  password={value.password}
                  org={this.props.org}
                  repo={this.props.repo}
                  id={this.props.id}
                />
              }
            </UserContext.Consumer>

          </div>
        </div>
      )
    }
}
