import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, unsetNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
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