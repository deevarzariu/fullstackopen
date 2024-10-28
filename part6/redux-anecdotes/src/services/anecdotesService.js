import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

export const fetchAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};
