import { useState } from 'react'

const Numbers = ({list}) => {
  return (
    <div>
      {list.map(person => (
        <p>
          {person.name}
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    persons.filter(person => person.name === newName).length === 0 ?
    setPersons(persons.concat(
      {
        name: newName
      }
    )) : alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers list={persons} />
    </div>
  )
}

export default App