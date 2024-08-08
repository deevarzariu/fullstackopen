import { useEffect, useState } from "react";
import { getCoordinates, getWeather } from "../services/country";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [temp, setTemp] = useState(0)
  const [wind, setWind] = useState(0)
  const [icon, setIcon] = useState(null)

  useEffect(() => {
    getCoordinates(country.capital[0])
      .then(({ lat, lon }) => {
        console.log({ lat, lon })
        getWeather({ lat, lon })
          .then(data => {
            setTemp(data.main.temp)
            setWind(data.wind.speed)
            setIcon(data.weather[0].icon)
          })
      })
  }, [])

  return <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital[0]}</div>
    <div>area {country.area}</div>
    <h3>languages</h3>
    <ul>
      {
        Object.entries(country.languages).map(([key, value]) =>
          <li key={key}>{value}</li>
        )
      }
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} />
    <Weather city={country.capital[0]} temp={temp} wind={wind} icon={icon} />
  </div>
}

export default Country;