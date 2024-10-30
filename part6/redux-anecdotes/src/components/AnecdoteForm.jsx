import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(createNewAnecdote(content));
    dispatch(showNotification(`you created '${content}'`, 5))
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