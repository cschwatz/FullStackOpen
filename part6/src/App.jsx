import AnecdoteList from './components/AnecdoteList'
import NewAnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <h2>create new</h2>
      <NewAnecdoteForm />
    </div>
  )
}

export default App