const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const workoutRouter = require('./controllers/workouts')
const usersRouter = require('./controllers/users')
const favouriteWorkoutRouter = require('./controllers/favourite_workout')
const loginRouter = require('./controllers/login')
const appDataRouter = require('./controllers/appData')

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('connecting to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDb: ', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)
app.use('/api/workouts', workoutRouter)
app.use('/api/users', usersRouter)
app.use('/api/favourite_workouts', favouriteWorkoutRouter)
app.use('/api/login', loginRouter)
app.use('/api/appData', appDataRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app