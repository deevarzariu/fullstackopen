import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
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