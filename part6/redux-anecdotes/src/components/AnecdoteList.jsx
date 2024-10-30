import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote));
    dispatch(showNotification(`you voted '${anecdote.content}'`, 5))
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