import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl, createPerson, updatePerson, deletePerson } from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const TIMEOUT = 3000

const style = {
  successMessage: {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    border: 'green solid 2px',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  },
  errorMessage: {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    border: 'red solid 2px',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterKeyword, setFilterKeyword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value)
  }

  const handleFilter = (e) => {
    setFilterKeyword(e.target.value);
  }

  const addPerson = () => {
    createPerson({ name: newName, number: newPhone })
      .then(person => {
        console.log('person?', person)
        setSuccessMessage(`Added ${person.name}`)
        setPersons([...persons, person])
        resetState();
      })
  }

  const updatePersonNumber = (id, name) => {
    updatePerson({ id, name: newName, number: newPhone })
      .then(person => {
        setSuccessMessage(`Changed ${person.name}'s phone number`)
        const newPersons = persons.map((p) =>
          p.name === newName ? person : p
        )
        setPersons(newPersons)
        resetState();
      })
      .catch(() => {
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage("")
        }, TIMEOUT);
      })
  }

  const resetState = () => {
    setNewName("")
    setNewPhone("")
    setTimeout(() => {
      setSuccessMessage("")
    }, TIMEOUT);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!findPerson()) {
      addPerson();
      return;
    }

    const shouldUpdate = confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
    if (shouldUpdate) {
      const person = findPerson()
      updatePersonNumber(person.id, person.name)
    }
  }

  const findPerson = () => {
    return persons.find(({ name }) => name === newName)
  }

  const handleDelete = ({ id, name }) => {
    const shouldDelete = confirm(`Delete ${name}?`)
    if (!shouldDelete) return;

    deletePerson(id).then((data) => {
      setPersons(persons.filter(person => person.id !== data.id))
    })
  }

  const filteredPersons =
    filterKeyword ?
      persons.filter(({ name }) => name.toLocaleLowerCase().includes(filterKeyword.toLocaleLowerCase())) :
      persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage && <div style={style.successMessage}>{successMessage}</div>}
      {errorMessage && <div style={style.errorMessage}>{errorMessage}</div>}
      <Filter value={filterKeyword} onChange={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        phone={newPhone}
        onNameChange={handleNameChange}
        onPhoneChange={handlePhoneChange}
        onSubmit={handleSubmit}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} onDelete={handleDelete} />
    </div>
  )
}

export default App