import { useState, useEffect } from 'react'
import personService from './services/persons'

const DeleteButton = ({handleDelete, id }) => {
  return (
    <button onClick={() => handleDelete(id)}>
      Delete
    </button>
  )
}

const SearchPerson = ({handleFilter}) => {
  return (
    <div>
      filter shown with <input 
      onChange={handleFilter} 
      />
    </div>
  )
}

const PhoneBookForm = ({ addPerson, name, handleName, number, handleNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
        value={name}
        onChange={handleName}
        />
      </div>
      <div>
        number: <input 
        value={number}
        onChange={handleNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Numbers = ({list, handleDelete}) => {
  return (
    <div>
      {list.map(person => (
        <p key={person.id}>
          {person.name} {person.number} <DeleteButton handleDelete={handleDelete} id={person.id} />
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
    const personObject = {
      name: newName,
      number: newNumber,
    }
    // check if new person obj is in book - if not -> post request with new obj
    persons.filter(person => person.name === newName).length === 0 ?
    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    })
    : alert(`${newName} is already added to phonebook`)
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

  const handleUpdate = (id, number) => {

  }

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
    }
    
  }

  // Effect hook to fetch data at first render of the App (fetches only once)
  useEffect(() => {
    personService
    .getAll('http://localhost:3001/persons')
    .then(curretPersons => {
      setPersons(curretPersons)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson 
      handleFilter={handleFilterChange} 
      />
      <h2>Add a new</h2>
      <PhoneBookForm 
      name={newName} 
      number={newNumber} 
      handleName={handleNameChange} 
      handleNumber={handleNumberChange} 
      addPerson={addNumber}
      />
      <h2>Numbers</h2>
      <Numbers list={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App