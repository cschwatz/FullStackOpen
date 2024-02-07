import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import store from './components/store'

const currentStore = store

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={currentStore}>
    <App />
  </Provider>
)