import axios from "axios";

const baseUrl = "http://localhost:3003/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const fetchAnecdotes = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const createAnecdote = async (content) => {
  const anecdote = asObject(content);
  const res = await axios.post(baseUrl, anecdote);
  return res.data;
};
