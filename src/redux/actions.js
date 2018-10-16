import axios from 'axios';


/*
 * action types
 */
export const GET_FILTERED_ISSUES_LIST = 'GET_FILTERED_ISSUES_LIST';
export const GET_ISSUES_BEGIN = 'GET_ISSUES_BEGIN';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const GET_ISSUES_FAILURE = 'GET_ISSUES_FAILURE';
export const UPDATE_REPO_FORM = 'UPDATE_REPO_FORM';
export const GET_ISSUE_BEGIN = 'GET_ISSUE_BEGIN';
export const GET_ISSUE_SUCCESS = 'GET_ISSUE_SUCCESS';
export const GET_ISSUE_FAILURE = 'GET_ISSUE_FAILURE';
export const GET_COMMENTS_BEGIN = 'GET_COMMENTS_BEGIN';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const POST_COMMENT_BEGIN = 'POST_COMMENT_BEGIN';
export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const POST_COMMENT_FAILURE  = 'POST_COMMENT_FAILURE';
export const UPDATE_PAGE_COUNT = 'UPDATE_PAGE_COUNT';
export const INSERT_COMMENT = 'INSERT_COMMENT';
export const INSERT_ORG_AND_REPO = 'INSERT_ORG_AND_REPO';
export const LOG_IN_BEGIN = 'LOG_IN_BEGIN';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
export const LOG_OUT = 'LOG_OUT';


export function updatePageCount(number) {
  return {
    type: UPDATE_PAGE_COUNT,
    number
  }
}

export function getFilteredList(value) {
  return {
    type: GET_FILTERED_ISSUES_LIST,
    value
  }
}

export function getIssuesSuccess(resp) {
  return {
    type: GET_ISSUES_SUCCESS,
    issues : resp.data,
    isFetchingIssues : false,
    issuesCount : resp.data.length
  }
}

export function getIssuesFailure(error) {
  return {
    type: GET_ISSUES_FAILURE,
    error
  }
}

export function getIssues(org, repo, page) {
  return dispatch => {
    console.log('dispatched');
    dispatch({type : GET_ISSUES_BEGIN});
    return axios.get(`https://api.github.com/repos/${org}/${repo}/issues?page=${page}`)
    .then(resp => dispatch(getIssuesSuccess(resp)))
    .catch(error => dispatch(getIssuesFailure(error)));
  }
}

export function getIssueSuccess(resp) {
  return {
    type: GET_ISSUE_SUCCESS,
    issue: resp.data,
    isFetchingIssue: false,
  }
}

export function getIssueFailure(error) {
  return {
    type: GET_ISSUE_FAILURE,
    error
  }
}

export function getIssue(org, repo, id) {
  return dispatch => {
    dispatch({type : GET_ISSUE_BEGIN});
    axios.get(`https://api.github.com/repos/${org}/${repo}/issues/${id}`)
    .then(resp => dispatch(getIssueSuccess(resp)))
    .catch(error => dispatch(getIssueFailure(error)));
  }
}

export function getCommentsSuccess(resp) {
  return {
    type: GET_COMMENTS_SUCCESS,
    comments: resp.data,
    isFetchingComments: false,
  }
}

export function getCommentsFailure(error) {
  return {
    type: GET_COMMENTS_FAILURE,
    isFetchingComments: false,
    error
  }
}

export function getComments(org, repo, id) {
  return dispatch => {
    dispatch({type : GET_COMMENTS_BEGIN});
    axios.get(`https://api.github.com/repos/${org}/${repo}/issues/${id}/comments`)
    .then(resp => dispatch(getCommentsSuccess(resp)))
    .catch(error => dispatch(getCommentsFailure(error)));
  }
}

export function postComment(org, repo, id, value) {
  return dispatch => {
    dispatch({type : POST_COMMENT_BEGIN});
    axios({
      url: `https://api.github.com/repos/${org}/${repo}/issues/${id}/comments`,
      method: 'post',
      data: {
        body: value
      },
      auth: {
        username: 'sham-sheer',
        password: '2feb1931b86a5646907851145cc9108f3fa145e7'
      }
    })
    .then(resp => dispatch(postCommentSuccess(resp)))
    .catch(error => dispatch(postCommentFailure(error)));
  }
}

export function postCommentSuccess(resp) {
  return {
    type: POST_COMMENT_SUCCESS,
    comment: resp.data
  }
}

export function postCommentFailure(error) {
  return {
    type: POST_COMMENT_FAILURE,
    error
  }
}

export function insertComment(value) {
  return {
    type: INSERT_COMMENT,
    value
  }
}

export function loginSuccess(resp) {
  return {
    type: LOG_IN_SUCCESS,
    accessToken: resp.data.substring(13, 53)
  }
}

export function loginFailure(error) {
  return {
    type: LOG_IN_FAILURE,
    error: error
  }
}

export function login(code, query) {
  return dispatch => {
    dispatch({type : LOG_IN_BEGIN});
    axios.post(`https://github.com/login/oauth/access_token?${query}`)
    .then(resp => dispatch(loginSuccess(resp)))
    .catch(error => dispatch(loginFailure(error)));
  }
}

export function logout() {
  return {
    type: LOG_OUT,
  }
}
