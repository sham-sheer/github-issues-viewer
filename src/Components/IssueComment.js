import React from 'react';
import ReactMarkdown from 'react-markdown';
import './IssueComment.css';
import {Redirect} from 'react-router';


export default class IssueComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.body,
      editing: false,
      redirect: false
    }
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

  logIn = () => {
    if(this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  render() {
    if(this.props.token !== null) {
      let button;
      let body = this.state.value;
      const user = this.props.user;
      if (!this.state.editing) {
        button = <a class="button is-warning" onClick={this.handleClick}>Edit</a>;
        body = <ReactMarkdown source={body} />
      } else {
        button = <a class="button is-success" onClick={this.handleClick}>Save</a>
        body = <form>
                <div className="form-group">
                  <textarea
                  className="form-control"
                  rows="3"
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder={body}
                  />
                </div>
              </form>
      }
      return (
        <div>
          <li className="list-group-item">
            <div id="comment-user">
              <small id="commented" className="form-text text-muted">
                {user} commented:
              </small>
            </div>
            <div className="content">{body}</div>
            <div>{button}</div>
            </li>
        </div>
      );
    }
    else {
      let button;
      let body = this.state.value;
      const user = this.props.user;
      button = <a class="button is-info" onClick={this.setRedirect}>Login to Edit</a>;
      body = <ReactMarkdown source={body} />
      return (
        <div>
          <li className="list-group-item">
            <div id="comment-user">
              <small id="commented" className="form-text text-muted">
                {user} commented:
              </small>
            </div>
            <div className="content">{body}</div>
            {this.logIn()}
            <div>{button}</div>
            </li>
        </div>
      );
    }
  }

}
