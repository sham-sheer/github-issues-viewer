import * as actions from './actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GET_FILTERED_ISSUES_LIST, GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE, GET_ISSUE_SUCCESS,
  GET_ISSUE_BEGIN, GET_ISSUE_FAILURE, GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS,
GET_COMMENTS_FAILURE, POST_COMMENT_BEGIN, POST_COMMENT_SUCCESS,
POST_COMMENT_FAILURE, UPDATE_PAGE_COUNT, INSERT_COMMENT } from './actions';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('actions', () => {
  it('should create an action to update page number', () => {
    const number = 3
    const expectedAction = {
      type: UPDATE_PAGE_COUNT,
      number
    }
    expect(actions.updatePageCount(number)).toEqual(expectedAction)
  })

  it('should create an action to filter a list of issues', () => {
    const value = 'a';
    const expectedAction = {
      type: GET_FILTERED_ISSUES_LIST,
      value
    }
    expect(actions.getFilteredList(value)).toEqual(expectedAction)
  })

  it('should create an action to insert comment in the commentBox', () => {
    const value = 'this is a comment';
    const expectedAction = {
      type: INSERT_COMMENT,
      value
    }
    expect(actions.insertComment(value)).toEqual(expectedAction)
  })
})

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  })
  it('creates GET_ISSUES_SUCCESS when getting issues has been done', () => {
    fetchMock.mock('https://api.github.com/repos/sham-sheer/github-issues-viewer/issues?page=1', { issues: { issues: ['mock issue']}})

    const expectedAction = [{"type": "GET_ISSUES_BEGIN"}, {"type": "GET_ISSUES_SUCCESS"}];

    const store = mockStore({ issues : []})

    return store.dispatch(actions.getIssues('sham-sheer', 'github-issues-viewer', '1')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})

const fake = [{"type": "GET_ISSUES_BEGIN"}, {"isFetchingIssues": false,
"issues": [{"assignee": null, "assignees": [],
"author_association": "OWNER",
"body": "### Test title\n\nTest Body",
"closed_at": null,
"comments": 27,
"comments_url": "https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/1/comments",
"created_at": "2018-09-26T18:06:11Z",
"events_url": "https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/1/events",
"html_url": "https://github.com/sham-sheer/github-issues-viewer/issues/1",
"id": 364147404,
"labels": [],
"labels_url": "https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/1/labels{/name}",
"locked": false,
"milestone": null,
"node_id": "MDU6SXNzdWUzNjQxNDc0MDQ=",
"number": 1,
"repository_url": "https://api.github.com/repos/sham-sheer/github-issues-viewer",
"state": "open",
"title": "Test Issue",
"updated_at": "2018-10-09T18:31:27Z",
"url": "https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/1",
"user": {"avatar_url": "https://avatars2.githubusercontent.com/u/18659784?v=4",
"events_url": "https://api.github.com/users/sham-sheer/events{/privacy}",
"followers_url": "https://api.github.com/users/sham-sheer/followers",
"following_url": "https://api.github.com/users/sham-sheer/following{/other_user}",
"gists_url": "https://api.github.com/users/sham-sheer/gists{/gist_id}",
"gravatar_id": "", "html_url": "https://github.com/sham-sheer",
"id": 18659784,
"login": "sham-sheer",
"node_id": "MDQ6VXNlcjE4NjU5Nzg0",
"organizations_url": "https://api.github.com/users/sham-sheer/orgs",
"received_events_url": "https://api.github.com/users/sham-sheer/received_events",
"repos_url": "https://api.github.com/users/sham-sheer/repos",
"site_admin": false,
"starred_url": "https://api.github.com/users/sham-sheer/starred{/owner}{/repo}",
"subscriptions_url": "https://api.github.com/users/sham-sheer/subscriptions",
"type": "User", "url": "https://api.github.com/users/sham-sheer"}}],
"issuesCount": 1, "type": "GET_ISSUES_SUCCESS"}]
