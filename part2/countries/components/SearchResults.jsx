import Country from './Country'
import CountryListItem from './CountryListItem';

const CountryList = ({ countries }) => {
  return <div>
    {countries.map(country =>
      <CountryListItem key={country.name.common} country={country} />
    )}
  </div>
}

const SearchResults = ({ countries }) => {
  if (!countries) return null;

  if (countries.length > 10) return <div>Too many matches, specify another filter</div>

  if (countries.length > 1) return <CountryList countries={countries} />

  return <Country country={countries[0]} />
}

export default SearchResults;