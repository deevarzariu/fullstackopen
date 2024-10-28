import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"
import { setNotification, unsetNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(unsetNotification());
    }, 5000);
  }

  return <>{
    anecdotes
      .filter(anecdote => anecdote.content.includes(filter))
      .map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} onVote={vote} />
      )}
  </>
}

export default AnecdoteList