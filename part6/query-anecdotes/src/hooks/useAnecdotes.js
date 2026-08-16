import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import { useSetNotification } from '../contexts/NotificationContext'    

export const useAnecdotes = () => {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification(`new anecdote '${newAnecdote.content}' created`, 5)
    },
    onError: (error) => {
      setNotification(`anecdote creation failed: ${error.message}`, 5)
    }
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: ({ id, updatedAnecdote }) => updateAnecdote(id, updatedAnecdote),
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updatedAnecdotes = anecdotes.map((anecdote) =>
        anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
      queryClient.setQueryData(['anecdotes'], updatedAnecdotes)
      setNotification(`anecdote '${updatedAnecdote.content}' voted`, 5)
    },
    onError: (error) => {
      setNotification(`anecdote voting failed: ${error.message}`, 5)
    }
  })

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    addAnecdote: newAnecdoteMutation.mutate,
    updateAnecdote: updateAnecdoteMutation.mutate
  }
}

