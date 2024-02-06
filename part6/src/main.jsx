import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const goodButton = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const okButton = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const badButton = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetButton = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={goodButton}>good</button> 
      <button onClick={okButton}>ok</button> 
      <button onClick={badButton}>bad</button>
      <button onClick={resetButton}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
