import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import Anecdote from "./Anecdote"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  // Make sure that the anecdotes are ordered by the number of votes.
  return <>{anecdotes.map(anecdote =>
    <Anecdote key={anecdote.id} anecdote={anecdote} onVote={vote} />
  )}</>
}

export default AnecdoteList