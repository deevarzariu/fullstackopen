import { createSlice } from "@reduxjs/toolkit";

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
    addAnecdote(state, action) {
      return [...state, action.payload];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { voteAnecdote, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
