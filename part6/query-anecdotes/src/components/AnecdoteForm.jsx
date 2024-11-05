import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (result) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(result));
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate({ content, votes: 0 });
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
