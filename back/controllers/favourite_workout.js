const bcrypt = require('bcrypt')
const { response } = require('../app')
const favouriteWorkoutRouter = require('express').Router()

const User = require('../models/user')
const Workout = require('../models/workout')

favouriteWorkoutRouter.post('/', async (request, response, next) => {
    const body = request.body

    const user = await User.findById(body.userId)
    if(user.favourite_workouts.includes(body.workout_id)){
        return response.status(400).json({ error: 'workout already favourited'})
    }
    const new_favourite_workout = await Workout.findById(body.workout_id)

    user.favourite_workouts = user.favourite_workouts.concat(new_favourite_workout.id)
    await user.save()

    response.json(user.toJSON())
})

favouriteWorkoutRouter.delete('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)
    //console.log('user', user.favourite_workouts[0]._id)
    //console.log('workout_id', body.workout_id)
    user.favourite_workouts = user.favourite_workouts.filter(workout => workout._id.toString() !== body.workout_id)
    await user.save()

    response.json(user.toJSON())
})

module.exports = favouriteWorkoutRouter