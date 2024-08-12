import axios from "axios";

export const baseUrl = "/api/persons";

export const createPerson = ({ name, number }) => {
  return axios
    .post(baseUrl, { name, number })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const updatePerson = ({ id, name, number }) => {
  return axios
    .put(`${baseUrl}/${id}`, { name, number })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
