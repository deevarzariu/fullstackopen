import { createSlice } from "@reduxjs/toolkit";
import {
  createAnecdote,
  fetchAnecdotes,
  voteAnecdote,
} from "../services/anecdotesService";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    updateAnecdote(state, action) {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote
        )
        .slice()
        .sort((a, b) => b.votes - a.votes);
    },
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await fetchAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await createAnecdote(content);
    dispatch(addAnecdote(anecdote));
  };
};

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await voteAnecdote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
