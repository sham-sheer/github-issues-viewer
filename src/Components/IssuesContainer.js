import React, { Component } from 'react';
import axios from 'axios';
import pic from './pic.png';
import IssuesList from './IssuesList';
import Pagination from 'react-js-pagination';
import { Route, Link } from 'react-router-dom';
import './IssuesContainer.css';
import IssueRTS from './IssueRTS';
import {Button} from 'react-bootstrap';
import {Redirect} from 'react-router';
import IssueLogButton from './IssueLogButton';


class IssuesContainer extends Component {
  constructor(props) {
    super(props);
    }

  state = {
    issues: [],
    issuesCount: 0,
    activePage: 1,
    org: 'rails',
    repo: 'rails',
    filteredValue: '',
    filteredIssues: [],
    token: ''
  }


  filterResults = (value) => {
    let unfilteredIssues = this.state.issues;
    let filtered = [];
    if(value.length > 0) {
      filtered = unfilteredIssues.filter((el) => el.title.trim().toLowerCase().match(value.toLowerCase()))
    }
    this.setState({
      filteredValue : value,
      filteredIssues : filtered
    })
  }

  componentWillMount() {
    if(typeof this.props.history.location.state !== 'undefined') {
      this.setState({
        org: this.props.history.location.state.org,
        repo: this.props.history.location.state.repo
      });
    }
  }


  componentDidMount() {
    this.setState({
      token: this.props.token
    })
    this.fetchIssues();
  }


  fetchIssues = () => {
    axios.get(`https://api.github.com/repos/${this.state.org}/${this.state.repo}/issues?page=${this.state.activePage}`)
    .then(resp => {
      this.setState({
        issues: resp.data,
        issuesCount: resp.data.length,
      });
      const state = {
        org: this.state.org,
        repo: this.state.repo
      }
      this.props.history.replace(this.props.location.pathname, state);
    })
    .catch(error => {
        if(this.state.org === '' || this.state.repo === '') {
          alert("Organisation/Repo fields are empty!");
        }
        else {
          alert("Either the Organisation or Repo do not exist. Please check again!");
        }
    })
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber
    })
    this.fetchIssues();
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      noIssues: false
    })
    this.fetchIssues();
    this.setState({
      noIssues: true
    })
  }

  handleLogOut = () => {
    localStorage.clear();
    this.setState({
      token: ''
    })
  }

  handleLogIn = () => {
    this.setState({
      redirect: true,
      token: this.props.token
    })
  }

  redirectToLogin = () => {
    if(this.state.redirect) {
      return (
        <Redirect to='/login' />
      )
    }
  }

  render() {
    let LoginButton;
    if(this.state.token !== '' && localStorage.getItem('at') !== null) {
      LoginButton = <Button bsStyle="warning" onClick={this.handleLogOut}>
                          Log Out
                        </Button>
    }
    else {
      LoginButton = <Button bsStyle="success" onClick={this.handleLogIn}>
                      Log In
                    </Button>
    }
    return (
      <div className="container">
       <nav className="navbar navbar-light bg-light">
       <img src={pic}></img>
        <form onSubmit={this.handleSubmit} className="form-inline">
         <div className="form-group mb-2">
            <input
              name="org"
              type="text"
              className="form-control"
              placeholder="Organisation"
              value={this.state.org}
              onChange={this.handleInputChange} />
          </div>
        <div className="form-group mb-2">
          <input
            name="repo"
            type="text"
            className="form-control"
            placeholder="Repo"
            value={this.state.repo}
            onChange={this.handleInputChange} />
        </div>
         <div>
         <input
           type="submit"
           value="Submit"
           className="btn btn-outline-dark col-sm form-group mb-2" />
          </div>
      </form>
      {this.redirectToLogin()}
      {LoginButton}
      </nav>
      <IssueRTS data={this.state.issues} handleFilter={this.filterResults} />
        {this.state.filteredIssues.length > 0 ?
          (<IssuesList data={this.state.filteredIssues} org={this.state.org}
          repo={this.state.repo} filteredValue={this.state.filteredValue} />) :
          (<IssuesList data={this.state.issues} org={this.state.org}
          repo={this.state.repo} />)
        }
          <div className="issues_pagination jumbotron">
          {
            this.state.issues.length > 0 ?
            (<Pagination
              activePage={this.state.activePage}
              itemsCountPerPage={20}
              totalItemsCount={300}
              pageRangeDisplayed={10}
              onChange={this.handlePageChange}
            />) : ("No Issues")
          }
          </div>
      </div>
    );
  }
}

export default IssuesContainer;
