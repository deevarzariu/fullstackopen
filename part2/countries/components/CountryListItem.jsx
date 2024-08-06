import { useState } from "react"
import Country from "./Country"

const CountryListItem = ({ country }) => {
  const [showCountry, setShowCountry] = useState(null)

  const toggleShow = () => {
    setShowCountry(!showCountry)
  }

  return <div>
    {country.name.common}
    <button onClick={toggleShow}>
      {showCountry ? 'hide' : 'show'}
    </button>
    {showCountry && <Country country={country} />}
  </div>
}

export default CountryListItem