import { apiMiddleware } from './middleware';

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  }
  const next = jest.fn();

  const invoke = (action) => apiMiddleware(store)(next)(action);

  return {store, next, invoke};
}

it('passes through non-function action', () => {
  const { next, invoke } = create()
  const action = {
    type: 'TEST',
    meta: {
      api_status: 'TEST'
    }
  }
  invoke(action);
  expect(next).toHaveBeenCalledWith(action);
})

it('passes dispatch and getState', () => {
  const { store, invoke } = create()
  invoke((dispatch, getState) => {
    dispatch({
      type: 'TEST DISPATCH',
      meta: {
        api_status: 'TEST'
      }
    })
    getState()
  })
  expect(store.dispatch).toHaveBeenCalledWith('TEST DISPATCH')
  expect(store.getState).toHaveBeenCalled()
})
