import { issuesReducer, loginReducer, issueReducer, commentsReducer } from './reducers';
import { GET_FILTERED_ISSUES_LIST, GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE, GET_ISSUE_SUCCESS,
  GET_ISSUE_BEGIN, GET_ISSUE_FAILURE, GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS,
GET_COMMENTS_FAILURE, POST_COMMENT_BEGIN, POST_COMMENT_SUCCESS,
POST_COMMENT_FAILURE, UPDATE_PAGE_COUNT, INSERT_COMMENT, LOG_IN_BEGIN,
LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT } from './actions';
import fakeIssues from './fakeIssues';

describe('issues reducer', () => {
  it('should return the initial state', () => {
    expect(issuesReducer(undefined, {})).toEqual(
      {
        issues: [],
        org: 'rails',
        repo: 'rails',
        filteredValue: '',
        filteredIssues: [],
        issuesCount: 0,
        pageCount: 1,
        isFetchingIssues: false,
        isError: false,
        error: null
      }
    )
  })

  it('should set isFetchingIssues boolean to be true', () => {
    expect(issuesReducer({
      issues: [],
      org: 'rails',
      repo: 'rails',
      filteredValue: '',
      filteredIssues: [],
      issuesCount: 0,
      pageCount: 1,
      isFetchingIssues: false,
      isError: false,
      error: null
    }, {type: GET_ISSUES_BEGIN})).toEqual(
      {
        issues: [],
        org: 'rails',
        repo: 'rails',
        filteredValue: '',
        filteredIssues: [],
        issuesCount: 0,
        pageCount: 1,
        isFetchingIssues: true,
        isError: false,
        error: null
      }
    )
  })

  it('should update page number', () => {
    const number = 3;

    expect(issuesReducer({
      issues: [],
      org: 'rails',
      repo: 'rails',
      filteredValue: '',
      filteredIssues: [],
      issuesCount: 0,
      pageCount: 1,
      isFetchingIssues: false,
      isError: false,
      error: null
    },{type: UPDATE_PAGE_COUNT, number})).toEqual(
      {
        issues: [],
        org: 'rails',
        repo: 'rails',
        filteredValue: '',
        filteredIssues: [],
        issuesCount: 0,
        pageCount: number,
        isFetchingIssues: false,
        isError: false,
        error: null
      }
    )


  })

  it('should have successfully performed the GET request for issues', () => {
    const resp = [
      {
        "issues" : "dummy"
      }
    ]
    expect(issuesReducer({
      issues: [],
      org: 'rails',
      repo: 'rails',
      filteredValue: '',
      filteredIssues: [],
      issuesCount: 0,
      pageCount: 1,
      isFetchingIssues: true,
      isError: false,
      error: null
    },{type: GET_ISSUES_SUCCESS, issues : resp, isFetchingIssues: false})).toEqual(
      {
        issues: resp,
        org: 'rails',
        repo: 'rails',
        filteredValue: '',
        filteredIssues: [],
        issuesCount: undefined,
        pageCount: 1,
        isFetchingIssues: false,
        isError: false,
        error: null
      }
    )
  })

  it('should return an error if GET REQUEST fails', () => {
    const error = {
      "error" : "get request failed"
    }

    expect(issuesReducer({
      issues: [],
      org: 'rails',
      repo: 'rails',
      filteredValue: '',
      filteredIssues: [],
      issuesCount: 0,
      pageCount: 1,
      isFetchingIssues: true,
      isError: false,
      error: null
    },{type: GET_ISSUES_FAILURE, error})).toEqual(
      {
        issues: [],
        org: 'rails',
        repo: 'rails',
        filteredValue: '',
        filteredIssues: [],
        issuesCount: 0,
        pageCount: 1,
        isFetchingIssues: false,
        isError: true,
        error: error
      }
    )
  })

  it('should return a filtered array of the issues list', () => {
    const value = "Add ob";
    const filtered = [
      {
        "url": "https://api.github.com/repos/rails/rails/issues/34080",
        "repository_url": "https://api.github.com/repos/rails/rails",
        "labels_url": "https://api.github.com/repos/rails/rails/issues/34080/labels{/name}",
        "comments_url": "https://api.github.com/repos/rails/rails/issues/34080/comments",
        "events_url": "https://api.github.com/repos/rails/rails/issues/34080/events",
        "html_url": "https://github.com/rails/rails/pull/34080",
        "id": 366956776,
        "node_id": "MDExOlB1bGxSZXF1ZXN0MjIwNTA2OTc2",
        "number": 34080,
        "title": "Add observing emails to action mailer guide [ci skip]",
        "user": {
          "login": "baerjam",
          "id": 13968797,
          "node_id": "MDQ6VXNlcjEzOTY4Nzk3",
          "avatar_url": "https://avatars1.githubusercontent.com/u/13968797?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/baerjam",
          "html_url": "https://github.com/baerjam",
          "followers_url": "https://api.github.com/users/baerjam/followers",
          "following_url": "https://api.github.com/users/baerjam/following{/other_user}",
          "gists_url": "https://api.github.com/users/baerjam/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/baerjam/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/baerjam/subscriptions",
          "organizations_url": "https://api.github.com/users/baerjam/orgs",
          "repos_url": "https://api.github.com/users/baerjam/repos",
          "events_url": "https://api.github.com/users/baerjam/events{/privacy}",
          "received_events_url": "https://api.github.com/users/baerjam/received_events",
          "type": "User",
          "site_admin": false
        },
        "labels": [
          {
            "id": 150377,
            "node_id": "MDU6TGFiZWwxNTAzNzc=",
            "url": "https://api.github.com/repos/rails/rails/labels/docs",
            "name": "docs",
            "color": "02d7e1",
            "default": false
          }
        ],
        "state": "open",
        "locked": false,
        "assignee": {
          "login": "schneems",
          "id": 59744,
          "node_id": "MDQ6VXNlcjU5NzQ0",
          "avatar_url": "https://avatars2.githubusercontent.com/u/59744?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/schneems",
          "html_url": "https://github.com/schneems",
          "followers_url": "https://api.github.com/users/schneems/followers",
          "following_url": "https://api.github.com/users/schneems/following{/other_user}",
          "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
          "organizations_url": "https://api.github.com/users/schneems/orgs",
          "repos_url": "https://api.github.com/users/schneems/repos",
          "events_url": "https://api.github.com/users/schneems/events{/privacy}",
          "received_events_url": "https://api.github.com/users/schneems/received_events",
          "type": "User",
          "site_admin": false
        },
        "assignees": [
          {
            "login": "schneems",
            "id": 59744,
            "node_id": "MDQ6VXNlcjU5NzQ0",
            "avatar_url": "https://avatars2.githubusercontent.com/u/59744?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/schneems",
            "html_url": "https://github.com/schneems",
            "followers_url": "https://api.github.com/users/schneems/followers",
            "following_url": "https://api.github.com/users/schneems/following{/other_user}",
            "gists_url": "https://api.github.com/users/schneems/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/schneems/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/schneems/subscriptions",
            "organizations_url": "https://api.github.com/users/schneems/orgs",
            "repos_url": "https://api.github.com/users/schneems/repos",
            "events_url": "https://api.github.com/users/schneems/events{/privacy}",
            "received_events_url": "https://api.github.com/users/schneems/received_events",
            "type": "User",
            "site_admin": false
          }
        ],
        "milestone": null,
        "comments": 1,
        "created_at": "2018-10-04T20:27:17Z",
        "updated_at": "2018-10-04T20:27:20Z",
        "closed_at": null,
        "author_association": "CONTRIBUTOR",
        "pull_request": {
          "url": "https://api.github.com/repos/rails/rails/pulls/34080",
          "html_url": "https://github.com/rails/rails/pull/34080",
          "diff_url": "https://github.com/rails/rails/pull/34080.diff",
          "patch_url": "https://github.com/rails/rails/pull/34080.patch"
        },
        "body": "Adds information on using email observer classes with Action Mailer.\r\nIntercepting Emails section is changed to \"Intercepting and Observing\r\nEmails\", with a sub-section on each topic.\r\nAlso includes slight reworking of the Intercepting Emails summary to flow\r\nwith the new structure.\r\n"
        }
    ];
    expect(issuesReducer({
      issues: fakeIssues,
      org: 'rails',
      repo: 'rails',
      filteredValue: '',
      filteredIssues: [],
      issuesCount: 0,
      pageCount: 1,
      isFetchingIssues: false,
      isError: false,
      error: null
    }, {type: GET_FILTERED_ISSUES_LIST, value})).toEqual(
      {
        issues: fakeIssues,
        org: 'rails',
        repo: 'rails',
        filteredValue: value,
        filteredIssues: filtered,
        issuesCount: 0,
        pageCount: 1,
        isFetchingIssues: false,
        isError: false,
        error: null
      })
  })
})

describe('issue reducer', () => {
  it('should return the initial state for 1 issue', () => {
    expect(issueReducer(undefined, {})).toEqual(
      {
        id : '',
        issue : [],
        editing: false,
        isFetchingIssue: false,
        isError: false
      }
    )
  })

  it('should set isFetchingIssues boolean to be true', () => {
    expect(issueReducer({
      id : '',
      issue : [],
      editing: false,
      isFetchingIssue: false,
      isError: false
    }, {type: GET_ISSUE_BEGIN})).toEqual(
    {
      id : '',
      issue : [],
      editing: false,
      isFetchingIssue: true,
      isError: false
      }
    )
  })

  it('should have successfully performed the GET request for 1 issue', () => {
    const resp = [
      {
        "1 issue" : "1 dummy"
      }
    ]
    expect(issueReducer({
      id : '',
      issue : [],
      editing: false,
      isFetchingIssue: true,
      isError: false
    },{type: GET_ISSUE_SUCCESS, issue : resp, isFetchingIssues: false})).toEqual(
    {
        id : '',
        issue : resp,
        editing: false,
        isFetchingIssue: false,
        isError: false
      }
    )
  })

  it('should return an error if GET REQUEST fails', () => {
    const error = {
      "error" : "get request failed"
    }

    expect(issueReducer(
    {
      id : '',
      issue : [],
      editing: false,
      isFetchingIssue: true,
      isError: false
    },{type: GET_ISSUE_FAILURE, error})).toEqual(
    {
      id : '',
      issue : [],
      editing: false,
      isFetchingIssue: false,
      isError: true,
      error: error
    })
  })
})

describe('login reducer', () => {
  it('should begin logging in the user', () => {
    expect(loginReducer(
    {
      accessToken: '',
      error: ''
    }, {type: LOG_IN_BEGIN})).toEqual(
      {
        accessToken: '',
        error: ''
      }
    )
  })

  it('should have successfully logged in the user', () => {
    expect(loginReducer({
      accessToken: '',
      error: ''
    }, {type: LOG_IN_SUCCESS, accessToken: 'accessToken'})).toEqual(
    {
      accessToken: 'accessToken',
      error: ''
    }
    )
  })

  it('should have successfully logged out the user', () => {
    expect(loginReducer({
      accessToken: 'accessToken',
      error: ''
    }, {type: LOG_OUT})).toEqual(
      {
        accessToken: '',
        error: ''
      }
    )
  })
})
