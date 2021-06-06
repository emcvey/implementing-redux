export default {
  createStore,
  applyMiddleware,
}

function createStore(reducerFn) {
  let currentState = reducerFn()
  let reducer = reducerFn
  if (typeof reducerFn !== 'function') {
    throw Error('The reducer passed must be a function.')
  }

  function dispatch(action) {
    if (
      !action ||
      typeof action !== 'object' ||
      typeof action.type !== 'string'
    ) {
      throw Error(
        'The dispatched action must be an object with type property that has a string value: { type: string, ...any }'
      )
    }

    currentState = reducer(currentState, action)
  }

  function getState() {
    return currentState
  }

  const store = {
    dispatch,
    getState,
  }

  return store
}

function applyMiddleware() {}
