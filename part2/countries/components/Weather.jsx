const Weather = ({ city, temp, wind, icon }) => <div>
  <h1>Weather in {city}</h1>
  <div>temperature {temp} Celsius</div>
  <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
  <div>wind {wind} m/s</div>
</div>

export default Weather;