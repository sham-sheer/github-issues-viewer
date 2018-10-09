
import { GET_FILTERED_ISSUES_LIST, GET_ISSUES_BEGIN, GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE, GET_ISSUE_SUCCESS,
  GET_ISSUE_BEGIN, GET_ISSUE_FAILURE, GET_COMMENTS_BEGIN, GET_COMMENTS_SUCCESS,
GET_COMMENTS_FAILURE, POST_COMMENT_BEGIN, POST_COMMENT_SUCCESS,
POST_COMMENT_FAILURE, UPDATE_PAGE_COUNT, INSERT_COMMENT } from './actions';
import {combineReducers} from 'redux';


const initialState = {
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
};

function issuesReducer(state = initialState, action) {
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
        issuesCount : action.issuesCount,
        isFetchingIssues : false,
        isError : false
      }
    case GET_ISSUES_FAILURE :
      return {
        ...state,
        error : action.error,
        isError : true,
        isFetchingIssue: false
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

function issueReducer(state = initialIssueState, action) {
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
  insertComment: ''
}

function commentsReducer(state = initialCommentsState, action) {
  switch(action.type) {
    case GET_COMMENTS_BEGIN:
      return {
        ...state,
      }
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.comments,
      }
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        errorGet: action.error,
      }
    case POST_COMMENT_BEGIN:
      return {
        ...state,
      }
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.comment
      }
    case POST_COMMENT_FAILURE:
      return {
        ...state,
        errorPost: action.error
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

const rootReducer = combineReducers({
  issues: issuesReducer,
  issue: issueReducer,
  comments: commentsReducer
})


export default rootReducer;
