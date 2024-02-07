import AnecdoteList from './components/AnecdoteList'
import NewAnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

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