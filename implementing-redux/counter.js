import Dedux from './dedux.js'
const { applyMiddleware, createStore } = Dedux

const defaultState = { count: 0 }
const reducer = (state = defaultState, action = {}) => {
  if (action.type === 'INCREASE') {
    state.count = state.count + 1
  } else if (action.type === 'DECREASE') {
    state.count = state.count - 1
  } else if (action.type === 'RESET') {
    state.count = 0
  } else if (action.type === 'SET') {
    state.count = action.value
  }

  return state
}

const store = createStore(reducer)

const saveCountMiddleware = store => next => action => {
  next(action)
  let state = store.getState()
  localStorage.setItem('count', state.count)
}

applyMiddleware(store, [saveCountMiddleware])

window.onload = () => {
  const localCount = localStorage.count
  if (localCount) {
    store.dispatch({ type: 'SET', value: parseInt(localCount) })
  }
}

window.increaseCounter = () => {
  store.dispatch({ type: 'INCREASE' })
}

window.decreaseCounter = () => {
  store.dispatch({ type: 'DECREASE' })
}

window.resetCounter = () => {
  store.dispatch({ type: 'RESET' })
}

store.subscribe(state => {
  document.querySelector('#count').textContent = state.count
})
