import AnecdoteList from './components/AnecdoteList'
import NewAnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  
const dispatch = useDispatch()

useEffect(() => {
  dispatch(initializeAnecdotes())
}, [])

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <NewAnecdoteForm />
    </div>
  )
}

export default App