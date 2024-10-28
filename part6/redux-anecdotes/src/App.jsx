import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAnecdotes } from './services/anecdotesService'
import { setAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnecdotes = async () => {
      const anecdotes = await fetchAnecdotes();
      dispatch(setAnecdotes(anecdotes))
    }
    getAnecdotes();
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App