import { useState, useEffect } from 'react'
import axios from 'axios'
import { createPerson, updatePerson, deletePerson } from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterKeyword, setFilterKeyword] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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
        setPersons([...persons, person])
        setNewName("")
        setNewPhone("")
      })
  }

  const updatePersonNumber = (id) => {
    updatePerson({ id, name: newName, number: newPhone })
      .then(data => {
        const newPersons = persons.map(person =>
          person.name === newName ?
            data :
            person
        )
        setPersons(newPersons)
        setNewName("")
        setNewPhone("")
      })
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
      updatePersonNumber(person.id)
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