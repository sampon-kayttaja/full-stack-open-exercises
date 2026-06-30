import { useAnecdoteActions } from "../store"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const { add, setNotification, clearNotification } = useAnecdoteActions()

  const addAnecdote = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    add(content)
    e.target.reset()

    setNotification(`you created '${content}'`)
    setTimeout(() => {
      clearNotification()
    }, 5000)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
      </form>  
    </div>
  )
}

export default AnecdoteForm