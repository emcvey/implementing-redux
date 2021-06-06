export default {
  createStore,
  applyMiddleware,
}

function createStore(reducerFn) {
  let currentState = reducerFn()
  if (typeof reducerFn !== 'function') {
    throw Error('The reducer passed must be a function.')
  }

  function getState() {
    return currentState
  }

  const store = {
    getState,
  }

  return store
}

function applyMiddleware() {}
