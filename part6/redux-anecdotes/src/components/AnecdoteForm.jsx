import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, unsetNotification } from "../reducers/notificationReducer";
import { createAnecdote } from "../services/anecdotesService";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const submitAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const anecdote = await createAnecdote(content);
    dispatch(addAnecdote(anecdote));

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