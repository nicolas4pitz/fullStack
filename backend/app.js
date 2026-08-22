import config from './utils/config.js'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import notesRouter from './controllers/notes.js'
import personsRouter from './controllers/persons.js'
import middleware from './utils/middleware.js'
import logger from './utils/logger.js'
import mongoose from 'mongoose'

const app = express()

mongoose.set('strictQuery', false)

if (config.MONGODB_URI) {
  logger.info('connecting to', config.MONGODB_URI)

  mongoose.connect(config.MONGODB_URI)
    .then(() => {
      logger.info('connected to MongoDB')
    })
    .catch((error) => {
      logger.error('error connecting to MongoDB:', error.message)
    })
} else {
  logger.info('No MONGODB_URI provided in environment, skipping MongoDB connection.')
}

app.use(cors())
app.use(express.static('dist')) // using dist because Vite usually creates dist instead of build
app.use(express.json())
app.use(morgan("tiny"))
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)
app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

export default app
