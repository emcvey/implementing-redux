export default {
  createStore,
  applyMiddleware,
}

function createStore(reducerFn) {
  if (typeof reducerFn !== 'function') {
    throw Error('The reducer passed must be a function.')
  }
}

function applyMiddleware() {}
