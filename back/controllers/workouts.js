const workoutRouter = require('express').Router()
const Workout = require('../models/workout')

workoutRouter.get('/', async (request, response) => {
    const workouts = await Workout.find({})
    response.json(workouts.map(w => w.toJSON()))
})

workoutRouter.post('/', async (request, response) => {
    const workout = new Workout(request.body)
    const saved_workout = await workout.save()
    response.status(201).json(saved_workout)
})

module.exports = workoutRouter