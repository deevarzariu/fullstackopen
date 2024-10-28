import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    voteAnecdote(state, action) {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload
            ? {
                ...anecdote,
                votes: anecdote.votes + 1,
              }
            : anecdote
        )
        .slice()
        .sort((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      return [...state, asObject(action.payload)];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
