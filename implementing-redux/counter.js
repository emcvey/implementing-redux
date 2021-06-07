import Dedux from './dedux.js'
const { createStore } = Dedux

const defaultState = { count: 0 }
const reducer = (state = defaultState, action = {}) => {
  if (action.type === 'INCREASE') {
    state.count = state.count + 1
  } else if (action.type === 'DECREASE') {
    state.count = state.count - 1
  } else if (action.type === 'RESET') {
    state.count = 0
  }

  return state
}

const store = createStore(reducer)

window.increaseCounter = function() {
  store.dispatch({ type: 'INCREASE' })
}

window.decreaseCounter = function() {
  store.dispatch({ type: 'DECREASE' })
}

window.resetCounter = function() {
  store.dispatch({ type: 'RESET' })
}

store.subscribe(state => {
  document.querySelector('#count').textContent = state.count
})
