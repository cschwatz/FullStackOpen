import { useState } from 'react'

const Numbers = ({list}) => {
  return (
    <div>
      {list.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNumber = (event) => {
    event.preventDefault()
    persons.filter(person => person.name === newName).length === 0 ?
    setPersons(persons.concat(
      {
        name: newName,
        number: newNumber,
        id: (persons.length + 1)
      }
    )) : alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
  }
  const personsToShow = showAll 
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (event.target.value === '') {
      setShowAll(true)
    } else {
      setShowAll(false)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input 
        onChange={handleFilterChange} 
        />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers list={personsToShow} />
    </div>
  )
}

export default App