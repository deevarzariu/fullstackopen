import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const getCountries = (name) => {
  return axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => {
      const countries = response.data;
      return countries.filter((country) =>
        country.name.common.toLowerCase().includes(name.toLowerCase())
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCoordinates = (city) => {
  return axios
    .get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`
    )
    .then((response) => {
      const { lat, lon } = response.data[0];
      return { lat, lon };
    });
};

export const getWeather = ({ lat, lon }) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    )
    .then((response) => response.data);
};
