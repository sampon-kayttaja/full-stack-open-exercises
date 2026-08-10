import { useAnecdotes, useAnecdoteActions } from "../store"
 
const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, setNotification, clearNotification, deleteAnecdote } = useAnecdoteActions()

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    
    setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      clearNotification()
    }, 5000)
  }

  const handleDelete = async (anecdote) => {
    await deleteAnecdote(anecdote.id)

    setNotification(`you deleted '${anecdote.content}'`)
    setTimeout(() => clearNotification(), 5000)
  } 

  return (
    <>
      {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
        {anecdote.votes === 0 && (
              <button onClick={() => handleDelete(anecdote)}>delete</button>
            )}
        </div>
      </div>
    ))}
    </>
  )
}

export default AnecdoteList
    
    
    