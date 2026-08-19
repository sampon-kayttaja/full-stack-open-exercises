import { createContext, useContext } from 'react'
import { useAnecdotes } from '../hooks'

const AnecdoteContext = createContext()

export const AnecdoteProvider = ({ children }) => {
  const value = useAnecdotes()
  return (
    <AnecdoteContext.Provider value={value}>
      {children}
    </AnecdoteContext.Provider>
  )
}

export const useAnecdoteContext = () => useContext(AnecdoteContext)