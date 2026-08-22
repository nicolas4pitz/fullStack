import express from 'express'

const personsRouter = express.Router()

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

personsRouter.get('/', (request, response) => {
  response.json(persons)
})

// I will keep this here, so it will be accessed at /api/persons/info
// If it needs to be at /info, we can mount a separate route in app.js
personsRouter.get('/info', (request, response) => {
  let data = new Date();
  response.send(`<p>Phonebook has info for ${persons.length} people</p> <br/> <p> ${data.toString()} </p>`)
})

personsRouter.get('/:id', (request, response) => {
  const id = Number(request.params.id)
  let person = persons.find(p => p.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

personsRouter.delete('/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

export default personsRouter
