const workoutDescriptionRouter = require('express').Router()
const workoutDescription = require('../models/workoutDescription')

workoutDescriptionRouter.get('/', (request, response) => {
    workoutDescription
        .find({})
        .then(workouts => {
            response.json(workouts)
        })
})

workoutDescriptionRouter.post('/', (request, response) => {
    const workout_description = new workoutDescription(request.body)

    workout_description
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = workoutDescriptionRouter