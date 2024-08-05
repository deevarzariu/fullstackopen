import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterKeyword, setFilterKeyword] = useState('')

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

    setPersons([...persons, { name: newName, phone: newPhone }])
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
      <div>filter shown with
        <input value={filterKeyword} onChange={handleFilter} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filteredPersons.map(({ id, name, phone }) => <div key={id}>{name} {phone}</div>)
      }
    </div>
  )
}

export default App