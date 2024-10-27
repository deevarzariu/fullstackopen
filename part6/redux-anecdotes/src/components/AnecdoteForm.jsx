import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={submitAnecdote}>
      <div><input name="anecdote" /></div>
      <button type="submit">create</button>
    </form>
  </>
}

export default AnecdoteForm;