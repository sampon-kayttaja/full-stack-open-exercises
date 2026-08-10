import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore  from '../store'
import { useAnecdotes } from '../store'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

describe('anecdotes store', () => {
  it('anecdotes are loaded correctly from the backend', async () => {
    const anecdotes = [
      { content: 'Anecdote 1', id: '1', votes: 0 },
      { content: 'Anecdote 2', id: '2', votes: 0 }
    ]
    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result } = renderHook(() => useAnecdoteStore())
    
    act(() => {
      result.current.actions.initialize()
    })

    await waitFor(() => {
        expect(result.current.anecdotes).toEqual(anecdotes)
    })
  })

  it('anecdotes are ordered by votes (most votes first)', async () => {
    const anecdotes = [
      { content: 'Anecdote 1', id: '1', votes: 3 },
      { content: 'Anecdote 2', id: '2', votes: 10 },
      { content: 'Anecdote 3', id: '3', votes: 5 },
      { content: 'Anecdote 4', id: '4', votes: 0 }
    ]

    anecdoteService.getAll.mockResolvedValue(anecdotes)

    const { result } = renderHook(() => {
        const store = useAnecdoteStore()
        const sorted = useAnecdotes()
        return { store, sorted }
    })

    act(() => {
        result.current.store.actions.initialize()
    })

    await waitFor(() => {
        expect(result.current.sorted.map(a => a.votes)).toEqual([10, 5, 3, 0])
    })
  })

  it('filter works correctly', () => {
    const anecdotes = [
        { content: 'Anecdote x', id: '1', votes: 3 },
        { content: 'Anecdote y', id: '4', votes: 5 }
    ]
    useAnecdoteStore.setState({ anecdotes, filter: 'x' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toHaveLength(1)
    expect(result.current[0].id).toBe('1')
  })

  it('voting works correctly', async () => {
    const anecdotes = [
      { content: 'Anecdote 1', id: '1', votes: 3 },
      { content: 'Anecdote 2', id: '2', votes: 10 }
    ]
    anecdoteService.getAll.mockResolvedValue(anecdotes)
    anecdoteService.update.mockImplementation((id, updatedAnecdote) => Promise.resolve(updatedAnecdote))

    const { result } = renderHook(() => useAnecdoteStore())
    act(() => {
      result.current.actions.initialize()
    })

    await waitFor(() => {
      expect(result.current.anecdotes).toEqual(anecdotes)
    })

    act(() => {
      result.current.actions.vote('1')
    })

    await waitFor(() => {
      const updatedAnecdote = result.current.anecdotes.find(a => a.id === '1')
      expect(updatedAnecdote.votes).toBe(4)
    })
  })
})