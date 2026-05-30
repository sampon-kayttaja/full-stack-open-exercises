import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personService from './services/servercoms'
import { NotifError, NotifNonError } from './components/Notif'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (newName === '' || newNumber === '') {
      setErrorMessage('Name and number cannot be empty')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return
    }

    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(`${newName} is already added to phonebook, do you wish to change the number?`)) {
        updatePerson(person.id, { ...person, number: newNumber })
      }
    }

    else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${response.data.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const updatePerson = (id, personObject) => {
    personService
      .updateNumber(id, personObject)
      .catch(error => {
        setErrorMessage(
          `Contact '${personObject.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        return
      })   
      .then(response => {
        setPersons(persons.map(p => p.id !== id ? p : response.data))
        setNotificationMessage(`Updated ${response.data.name}'s number`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
      }
    }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const filterPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <NotifError message={errorMessage} />
      <NotifNonError message={notificationMessage} />

      <Filter 
        filter={filter} 
        handleFilterChange={handleFilterChange} 
        />

      <h2>Add a new</h2>
      
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange} 
        />

      <h2>Numbers</h2>

      <Persons 
        filterPersons={filterPersons} 
        deletePerson={deletePerson} 
        />
    </div>
  )

}

export default App