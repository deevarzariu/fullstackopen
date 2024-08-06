import axios from "axios";

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
