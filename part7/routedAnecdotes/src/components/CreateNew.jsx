import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'
import { useAnecdotes } from '../hooks'
import { useAnecdoteContext } from '../contexts/AnecdoteContext'

const CreateNew = () => {
  const { addAnecdote } = useAnecdoteContext()
  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote({ content: contentField.value, author: authorField.value, info: infoField.value, votes: 0 })
    navigate('/')
  }

  const handleReset = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={contentField.value} onChange={contentField.onChange} />
        </div>
        <div>
          author
          <input name='author' value={authorField.value} onChange={authorField.onChange} />
        </div>
        <div>
          url for more info
          <input name='info' value={infoField.value} onChange={infoField.onChange} />
        </div>
        <button>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
