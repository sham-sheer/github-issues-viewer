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
import { apiMiddleware, loggerMiddleware, tokenMiddleware } from './middleware';


const middlewares = [apiMiddleware, tokenMiddleware];
const mockStore = configureStore(middlewares);

describe('actions', () => {
  it('should create an action to update page number', () => {
    const number = 3
    const expectedAction = {
      type: UPDATE_PAGE_COUNT,
      number,
      meta: {
        api_status: "NULL"
      }
    }
    expect(actions.updatePageCount(number)).toEqual(expectedAction)
  })

  it('should create an action to filter a list of issues', () => {
    const value = 'a';
    const expectedAction = {
      type: GET_FILTERED_ISSUES_LIST,
      value,
      meta: {
        api_status: "NULL"
      }
    }
    expect(actions.getFilteredList(value)).toEqual(expectedAction)
  })

  it('should create an action to insert comment in the commentBox', () => {
    const value = 'this is a comment';
    const expectedAction = {
      type: INSERT_COMMENT,
      value,
      meta: {
        api_status: "NULL"
      }
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
      "payload": {
        "data": {
          "issues": {
            "issues": ["mock issue"]
          }
        }, "isFetching": false
      },
      "type": "GET_ISSUES_SUCCESS"
    }]

    const store = mockStore({ issues : []})

    return store.dispatch(actions.getIssues('sham-sheer', 'github-issues-viewer', '1')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('creates GET_ISSUE_SUCCESS when getting issues has been done', () => {
    fetchMock.getOnce("https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/5", { issue: { issue: ['mock issue']}})

    const expectedAction = [{"type": "GET_ISSUE_BEGIN"},
    {
      "payload": {
        "data": {
          "issue": {
            "issue": ["mock issue"]
          }
        }, "isFetching": false
      },
      "type": "GET_ISSUE_SUCCESS"
    }]

    const store = mockStore({ issue : []})

    return store.dispatch(actions.getIssue('sham-sheer', 'github-issues-viewer', '5')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })

  it('creates GET_COMMENTS_SUCCESS when getting comments has been done', () => {
    fetchMock.getOnce("https://api.github.com/repos/sham-sheer/github-issues-viewer/issues/5/comments", { comments: { comment: ['mock comment']}})

    const expectedAction = [{"type": "GET_COMMENTS_BEGIN"},
    {
      "payload": {
        "data": {
          "comments": {
            "comment": ["mock comment"]
          }
        }, "isFetching": false
      },
      "type": "GET_COMMENTS_SUCCESS"
    }]


    const store = mockStore({ issue : []})

    return store.dispatch(actions.getComments('sham-sheer', 'github-issues-viewer', '5')).then(() => {
      expect(store.getActions()).toEqual(expectedAction)
    })
  })
})
