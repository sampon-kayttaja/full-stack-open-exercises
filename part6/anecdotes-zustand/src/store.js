import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  notification: '',
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)      
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },

    deleteAnecdote: async (id) => {
      await anecdoteService.remove(id)
      set((state) => ({anecdotes: state.anecdotes.filter(a => a.id !== id)}))
    },

    vote: async (id) => {
      const anecdote = get().anecdotes.find(n => n.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1}
      )
      set(state =>({
        anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)
      }))
    },

    setFilter: value => set(() => ({ filter: value })),

    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()  
      set ({anecdotes})
    },

    setNotification: (message) => set({ notification: message }),
    
    clearNotification: () => set({ notification: '' }),
    
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  return anecdotes.filter(n => n.content.toLowerCase().includes(filter.toLowerCase()))
}
export const useNotification = () => useAnecdoteStore(state => state.notification)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
