import React, { Component } from 'react';
import pic from '../Components/pic.png';
import IssuesList from '../Components/IssuesList';
import Pagination from 'react-js-pagination';
import './IssuesContainer.css';
import IssueRTS from '../Components/IssueRTS';
import { connect } from 'react-redux';
import { getIssues, updatePageCount } from '../redux/actions';


class IssuesContainer extends Component {
  state = {
    org: 'sham-sheer',
    repo: 'github-issues-viewer',
  }

  componentWillMount() {
    if(typeof this.props.history.location.state !== 'undefined') {
      this.setState({
        org: this.props.history.location.state.org,
        repo: this.props.history.location.state.repo,
      });
    }
  }

  componentDidMount() {
    const { getIssues, pageCount } = this.props;
    const org = this.state.org;
    const repo = this.state.repo;
    getIssues(org, repo, pageCount);
  }

  handlePageChange = (pageNumber) => {
    const { getIssues, updatePageCount } = this.props;
    updatePageCount(pageNumber);
    const org = this.state.org;
    const repo = this.state.repo;
    const pageCount = this.props.pageCount;
    getIssues(org, repo, pageCount);

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
    const { getIssues } = this.props;
    const state = {
      org: this.state.org,
      repo: this.state.repo
    }
    this.props.history.replace(this.props.location.pathname, state);
    const org = this.props.history.location.state.org;
    const repo = this.props.history.location.state.repo;
    const activePage = this.props.activePage;
    getIssues(org, repo, activePage);
  }

  render() {
    return (
      <div className="container">
       <nav className="navbar navbar-light bg-light">
       <img src={pic} alt="No profile pic"></img>
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
      </nav>
      <IssueRTS data={this.props.issues} />

        { this.props.filteredIssues.length > 0 ?
          (<IssuesList data={this.props.filteredIssues} org={this.state.org}
          repo={this.state.repo} filteredValue={this.props.filteredValue} />)
          :
          (<IssuesList data={this.props.issues} org={this.state.org}
          repo={this.state.repo} />)
        }

          <div className="issues_pagination jumbotron">
          {
            this.props.issues.length > 0 ?
            (<Pagination
              activePage={this.props.pageCount}
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

const mapStateToProps = state => {
  return {
    filteredValue : state.issues.filteredValue,
    filteredIssues : state.issues.filteredIssues,
    issues : state.issues.issues,
    org : state.issues.org,
    repo: state.issues.repo,
    pageCount: state.issues.pageCount
  }
}

const mapDispatchToProps = { getIssues, updatePageCount }

export default connect(mapStateToProps, mapDispatchToProps)(IssuesContainer)
