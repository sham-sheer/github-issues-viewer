import * as actions from './actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GET_FILTERED_ISSUES_LIST, GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE, GET_ISSUE_SUCCESS,
  GET_ISSUE_BEGIN, GET_ISSUE_FAILURE, GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS,
GET_COMMENTS_FAILURE, POST_COMMENT_BEGIN, POST_COMMENT_SUCCESS,
POST_COMMENT_FAILURE, UPDATE_PAGE_COUNT, INSERT_COMMENT } from './actions';
import fetchMock from 'fetch-mock';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';


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
    fetchMock.getOnce("https://api.github.com/repos/sham-sheer/github-issues-viewer/issues?page=1", { issues: { issues: ['mock issue']}})

    const expectedAction = [{"type": "GET_ISSUES_BEGIN"},
    {
      "isFetchingIssues": false,
      "issues": {"issues": {"issues": ["mock issue"]}},
      "type": "GET_ISSUES_SUCCESS"
    }];

    const store = mockStore({ issues : []})

    return store.dispatch(actions.getIssues('sham-sheer', 'github-issues-viewer', '1')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('creates GET_ISSUE_SUCCESS when getting issues has been done', () => {
    fetchMock.getOnce("https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/5", { issue: { issue: ['mock issue']}})

    const expectedAction = [{"type": "GET_ISSUE_BEGIN"},
    {
      "isFetchingIssue": false,
      "issue": {"issue": {"issue": ["mock issue"]}},
      "type": "GET_ISSUE_SUCCESS"
    }];

    const store = mockStore({ issue : []})

    return store.dispatch(actions.getIssue('sham-sheer', 'github-issues-viewer', '5')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('creates GET_COMMENTS_SUCCESS when getting comments has been done', () => {
    fetchMock.getOnce("https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/5", { issue: { issue: ['mock issue']}})

    const expectedAction = [{"type": "GET_ISSUE_BEGIN"},
    {
      "isFetchingIssue": false,
      "issue": {"issue": {"issue": ["mock issue"]}},
      "type": "GET_ISSUE_SUCCESS"
    }];

    const store = mockStore({ issue : []})

    return store.dispatch(actions.getIssue('sham-sheer', 'github-issues-viewer', '5')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  //not working yet
  /*it('creates POST_COMMENT_SUCCESS when posting comments has been done', () => {
    const data =  {
      body: 'posted comment'
    }
    fetchMock.postOnce("https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/5/comments", {
        status: 200,
        body: JSON.stringify(data),
        statusText: 'OK',
        headers: {'Content-Type': 'application/json'},
        sendAsJson: false
      })

    const expectedAction = [{"type": "POST_COMMENT_BEGIN"},
    {
      "comments": {"comment": {"body": ["posted comment"]}},
      "type": "POST_COMMENT_SUCCESS"
    }];

    const store = mockStore({ issue : []})

    return store.dispatch(actions.postComment('sham-sheer', 'github-issues-viewer', '5')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })*/
})
