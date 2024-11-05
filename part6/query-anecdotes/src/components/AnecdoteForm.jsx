import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { NotificationContext } from "../context/NotificationContext";
import { showNotification } from "../utils";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const { dispatchNotification } = useContext(NotificationContext);

  const mutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (result) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(result));

      showNotification(dispatchNotification, `anecdote ${result.content} created`, 5);
    },
    onError: (error) => {
      console.log('err', error);
      showNotification(dispatchNotification, "anecdote too short, must be at least 5 characters long", 5);
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
