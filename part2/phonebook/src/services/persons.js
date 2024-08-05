import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

export const createPerson = ({ name, phone }) => {
  return axios.post(baseUrl, { name, phone }).then((response) => response.data);
};

export const deletePerson = (id) => {
  return axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
