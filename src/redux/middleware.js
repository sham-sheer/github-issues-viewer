import { createLogger } from 'redux-logger';

export const apiMiddleware = store => next => action => {
  if(action.meta.api_status === 'REQUEST') {
    next({
      type: action.type + '_BEGIN',
    })
    if(action.meta.call === 'POST') {
      return action.payload.call_api
      .then(resp => next({
        type: action.type + '_SUCCESS',
        payload: {
          data: resp,
        }
        })
      )
      .catch(error => next({
        type: action.type + '_FAILURE',
        payload: {
          error
        }
      }));
    }
    if(action.meta.call === 'GET') {
      return action.payload.call_api
      .then(resp => resp.json())
      .then(respJSON => next({
        type: action.type + '_SUCCESS',
        payload: {
          data: respJSON,
          isFetching: false
          }
        })
      )
      .catch(error => next({
        type: action.type + '_FAILURE',
        payload: {
          error,
          isFetching: false
          }
        })
      );
    }
  }
  return next(action);
}

export const tokenMiddleware = store => next => action => {
// Get the state before and after the action was performed
  if (action.type === 'LOG_IN_SUCCESS') {
    window.localStorage.setItem('at', action.accessToken);
  }
  if (action.type === 'LOG_OUT') {
    window.localStorage.setItem('at', '');
  }
  return next(action);
}

export const loggerMiddleware = createLogger();
