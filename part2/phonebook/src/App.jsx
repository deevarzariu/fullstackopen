import { useState, useEffect } from 'react'
import axios from 'axios'
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

  const addPerson = (e) => {
    e.preventDefault();

    if (!validateName()) {
      alert(`${newName} is already added to the phonebook`)
      return;
    }

    setPersons([...persons, { name: newName, phone: newPhone, id: persons.length + 1 }])
    setNewName("")
    setNewPhone("")
  }

  // the newName is valid if there are no other people with the same name in the persons array.
  // the validate function returns true if the filtered array of same-named people has no elements, 
  // thus its length is equal to 0.
  const validateName = () => {
    const personsWithSameName = persons.filter(({ name }) => name === newName)
    return personsWithSameName.length === 0
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
        onSubmit={addPerson}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App