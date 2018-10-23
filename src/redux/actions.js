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
export const GET_ISSUE = 'GET_ISSUE';
export const GET_ISSUES = 'GET_ISSUES';
export const GET_COMMENTS = 'GET_COMMENTS';
export const POST_COMMENT = 'POST_COMMENT';
export const LOG_IN = 'LOG_IN';

export function updatePageCount(number) {
  return {
    type: UPDATE_PAGE_COUNT,
    number,
    meta: {
      api_status: 'NULL'
    }
  }
}

export function getFilteredList(value) {
  return {
    type: GET_FILTERED_ISSUES_LIST,
    value,
    meta: {
      api_status: 'NULL'
    }
  }
}

export function getIssues(org, repo, page) {
  return {
    type: GET_ISSUES,
    payload: {
      call_api: fetch(`https://api.github.com/repos/${org}/${repo}/issues?page=${page}`),
    },
    meta: {
      api_status: 'REQUEST',
      call: 'GET'
    }
  }
}

export function getIssue(org, repo, id) {
  return {
    type: GET_ISSUE,
    payload: {
      call_api: fetch(`https://api.github.com/repos/${org}/${repo}/issues/${id}`),
    },
    meta: {
      api_status : 'REQUEST',
      call: 'GET'
    }
  }
}

export function getComments(org, repo, id) {
  return {
    type: GET_COMMENTS,
    payload: {
      call_api: fetch(`https://api.github.com/repos/${org}/${repo}/issues/${id}/comments`),
    },
    meta: {
      api_status : 'REQUEST',
      call: 'GET'
    }
  }
}

export function postComment(org, repo, id, value) {
  return {
    type: POST_COMMENT,
    payload: {
      call_api: axios({
        url: `https://api.github.com/repos/${org}/${repo}/issues/${id}/comments`,
        method: 'post',
        data: {
          body: value
        },
        auth: {
          username: 'sham-sheer',
          password: 'shamSHEER321'
        }
      }),
      url: `https://api.github.com/repos/${org}/${repo}/issues/${id}/comments`
    },
    meta: {
      api_status : 'REQUEST',
      call: 'POST'
    }
  }
}

export function insertComment(value) {
  return {
    type: INSERT_COMMENT,
    value,
    meta: {
      api_status: 'NULL'
    }
  }
}

export function login(query) {
  return {
    type: LOG_IN,
    payload: {
      call_api: axios.post(`https://github.com/login/oauth/access_token?${query}`),
      url: `https://github.com/login/oauth/access_token?${query}`
    },
    meta: {
      api_status : 'REQUEST',
      call: 'POST'
    }
  }
}

export function logout() {
  localStorage.setItem('at', '');
  return {
    type: LOG_OUT,
    meta: {
      api_status: 'NULL'
    }
  }
}
