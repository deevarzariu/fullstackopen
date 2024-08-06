import { useState, useEffect } from 'react'
import { getCountries } from '../services/country'
import SearchResults from '../components/SearchResults'

const App = () => {
  const [name, setName] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    if (!name) return;

    getCountries(name).then(countries => {
      setCountries(countries)
    })
  }, [name])

  const handleNameChange = (e) => {
    setName(e.target.value)
  }

  return <div>
    <div>
      find countries
      <input value={name} onChange={handleNameChange} />
    </div>
    <SearchResults countries={countries} />
  </div>
}

export default App
