import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handleInputChange = (e) => {
    setNewName(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault();

    if (!validateName()) {
      alert(`${newName} is already added to the phonebook`)
      return;
    }

    setPersons([...persons, { name: newName }])
    setNewName("")
  }

  // the newName is valid if there are no other people with the same name in the persons array.
  // the validate function returns true if the filtered array of same-named people has no elements, 
  // thus its length is equal to 0.
  const validateName = () => {
    const personsWithSameName = persons.filter(({ name }) => name === newName)
    return personsWithSameName.length === 0
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(({ name }) => <div key={name}>{name}</div>)}
    </div>
  )
}

export default App