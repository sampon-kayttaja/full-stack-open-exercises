require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.method(req, res) === 'POST' ? JSON.stringify(req.body) : ''
  ].join(' ')
}))

let persons = []

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    console.log(persons)
    res.json(persons)
  })
})

app.get('/api/info', (req, res) => {
  const date = new Date()
  Person.find({}).then(persons => {
    res.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${date}</p>
    `)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id).then(() => {
    res.status(204).end()
  }).catch(error => {
    console.log(error)
    res.status(400).send({ error: 'malformatted id' })
  })
})

const generateId = () => {
  const randomId = Math.floor(Math.random() * 1000000)
  return randomId
}

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: 'name is missing' })
  }

  if (!body.number) {
    return res.status(400).json({ error: 'number is missing' })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const person = new Person({
    id: generateId(),
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

