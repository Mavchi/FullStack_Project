const bcrypt = require('bcrypt')
const { response } = require('../app')
const favouriteWorkoutRouter = require('express').Router()

const User = require('../models/user')
const Workout = require('../models/workout')

favouriteWorkoutRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)
    const new_favourite_workout = Workout.findById(body.id)

    user.favourite_workouts = user.favourite_workouts.concat(new_favourite_workout._id)
    await user.save()

    response.json(new_favourite_workout.toJSON())
})

module.exports = favouriteWorkoutRouter