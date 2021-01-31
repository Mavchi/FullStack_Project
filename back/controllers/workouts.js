const workoutRouter = require('express').Router()
const Workout = require('../models/workout')

workoutRouter.get('/', (request, response) => {
    Workout
        .find({})
        .then(workouts => {
            response.json(workouts)
        })
})

workoutRouter.post('/', (request, response) => {
    const workout = new Workout(request.body)

    workout
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = workoutRouter