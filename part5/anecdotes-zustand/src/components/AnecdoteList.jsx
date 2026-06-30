import { useAnecdotes, useAnecdoteActions } from "../store"
 
const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { vote, setNotification, clearNotification } = useAnecdoteActions()

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes)

  const handleVote = (anecdote) => {
    vote(anecdote.id)
    
    setNotification(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      clearNotification()
    }, 5000)
  }

  return (
    <>
      {sortedAnecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ))}
    </>
  )
}

export default AnecdoteList
    
    
    