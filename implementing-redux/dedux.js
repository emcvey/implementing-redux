export default {
  createStore,
  applyMiddleware,
}

function createStore(reducerFn) {
  let currentState = reducerFn()
  let reducer = reducerFn
  let subscribers = {}
  let nextSubscriberId = 1
  if (typeof reducerFn !== 'function') {
    throw Error('The reducer passed must be a function')
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
    Object.values(subscribers).forEach(subscribeFn => {
      subscribeFn(currentState)
    })
  }

  function getState() {
    return currentState
  }

  function subscribe(subscribeFn) {
    if (typeof subscribeFn !== 'function') {
      throw Error('The subscriber must pass a function')
    }

    const subscriptionId = nextSubscriberId
    subscribers[`${subscriptionId}`] = subscribeFn
    nextSubscriberId++

    function unsubscribe() {
      if (subscribers[subscriptionId]) {
        delete subscribers[subscriptionId]
      } else {
        throw Error('This subscription has already been unsubscribed')
      }
    }

    return unsubscribe
  }

  const store = {
    dispatch,
    getState,
    subscribe,
  }

  return store
}

function applyMiddleware() {}
