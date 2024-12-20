const Anecdote = ({ anecdote, onVote }) => {
  return <div>
    <div>
      {anecdote.content}
    </div>
    <div>
      has {anecdote.votes}
      <button onClick={() => onVote(anecdote)}>vote</button>
    </div>
  </div>
}

export default Anecdote;