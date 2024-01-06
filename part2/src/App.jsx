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

const Notification = ({message}) => {
  if (message === null) {
    return null
  } 

  const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    borderStyle: message ? 'solid' : 'none',
    borderRadius: 5,
    padding: message ? 10 : 0,
    fontSize: 20,
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
  
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newNotification, setNotification] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find(person => person.name === newName)
    if (!existingPerson) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      changeNotification(`${personObject.name} was added to the phonebook`)
      setTimeout(() => changeNotification(null), 5000)
    } else {
      const changedPerson = {...existingPerson, number: newNumber}
      handleUpdate(existingPerson.id, changedPerson)
      changeNotification(`${personObject.name}'s number was updated`)
      setTimeout(() => changeNotification(null), 5000)
    }
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

  const handleUpdate = (id, updatedPerson) => {
    if (window.confirm(`${updatedPerson.name} is already added to Phonebook,replace the old number with a new one?`)) {
      personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => (person.id !== id ? person : returnedPerson)))
      })
      .catch(error => alert(console.error('Error updating person: ', error)))
    }
  }

  const handleDelete = (id) => {
    const toDelete = persons.find(person => person.id === id)
    if (window.confirm('Do you really want to delete this person?')) {
      personService
      .remove(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
      changeNotification(`${toDelete.name} was removed from the phonebook`)
      setTimeout(() => changeNotification(null), 5000)
    }
    
  }

  const changeNotification = (message) => {
    setNotification(message)
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
      <Notification message={newNotification} />
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