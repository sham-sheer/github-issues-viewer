
import { GET_FILTERED_ISSUES_LIST, GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE, GET_ISSUE_SUCCESS,
  GET_ISSUE_BEGIN, GET_ISSUE_FAILURE, GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS,
GET_COMMENTS_FAILURE, POST_COMMENT_BEGIN, POST_COMMENT_SUCCESS,
POST_COMMENT_FAILURE, UPDATE_PAGE_COUNT, INSERT_COMMENT, LOG_IN_BEGIN,
LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_OUT } from './actions';
import {combineReducers} from 'redux';


const initialState = {
  issues: [],
  org: 'rails',
  repo: 'rails',
  filteredValue: '',
  filteredIssues: [],
  pageCount: 1,
  isFetchingIssues: false,
  isError: false,
  error: null
};

export function issuesReducer(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PAGE_COUNT:
      return {
        ...state,
        pageCount: action.number
      }

    case GET_FILTERED_ISSUES_LIST:
      let unfilteredIssues = state.issues;
      let filtered = [];
      if(action.value.length > 0) {
        filtered = unfilteredIssues.filter((el) => el.title.trim().toLowerCase().match(action.value.toLowerCase()))
      }
      return {
        ...state,
        filteredValue : action.value,
        filteredIssues : filtered
      }
    case GET_ISSUES_BEGIN :
      return {
        ...state,
        isFetchingIssues : true,
      };
    case GET_ISSUES_SUCCESS :
      return {
        ...state,
        issues : action.issues,
        isFetchingIssues : false,
        isError : false
      }
    case GET_ISSUES_FAILURE :
      return {
        ...state,
        error : action.error,
        isError : true,
        isFetchingIssues: false
      }
    default:
      return state;
  }
}

const initialIssueState = {
  id : '',
  issue : [],
  editing: false,
  isFetchingIssue: false,
  isError: false
};

export function issueReducer(state = initialIssueState, action) {
  switch(action.type) {
    case GET_ISSUE_BEGIN:
      return {
        ...state,
        isFetchingIssue: true
      }
    case GET_ISSUE_SUCCESS:
      return {
        ...state,
        issue: action.issue,
        isFetchingIssue: false
      }
    case GET_ISSUE_FAILURE:
      return {
        ...state,
        error: action.error,
        isError: true,
        isFetchingIssue: false
      }
    default:
      return state;
  }
}

const initialCommentsState = {
  comments: [],
  comment: [],
  errorGet: '',
  errorPost: '',
  insertComment: '',
  isFetchingComments: false
}

export function commentsReducer(state = initialCommentsState, action) {
  switch(action.type) {
    case GET_COMMENTS_BEGIN:
      return {
        ...state,
        isFetchingComments: true
      }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
        isFetchingComments: false
      }
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        errorGet: action.error,
        isFetchingComments: false

      }
    case POST_COMMENT_BEGIN:
      return {
        ...state,
        isFetchingComments: true
      }
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.comment,
        isFetchingComments: false
      }
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        errorPost: action.error,
        isFetchingComments: false
      }
    case INSERT_COMMENT:
      return {
        ...state,
        insertComment: action.value
      }
    default:
      return state;
  }
}

const initialLoginState = {
  accessToken: '',
  error: ''
}

export function loginReducer(state = initialLoginState, action) {
  switch(action.type) {
    case LOG_IN_BEGIN:
      return {
        ...state
      }
    case LOG_IN_SUCCESS:
      return {
        ...state,
        accessToken: action.accessToken
      }
    case LOG_IN_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case LOG_OUT:
      return {
        ...state,
        accessToken: ''
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  issues: issuesReducer,
  issue: issueReducer,
  comments: commentsReducer,
  login: loginReducer
})


export default rootReducer;
