const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { response } = require('../app')
const favouriteWorkoutRouter = require('express').Router()

const User = require('../models/user')
const Workout = require('../models/workout')

const getTokenForm = request => {
    const authorization = request.get('authorization')
    if( authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

favouriteWorkoutRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenForm(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missin or invalid'})
    }

    const user = await User.findById(decodedToken.id)
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
    const token = getTokenForm(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missin or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    //console.log('user', user.favourite_workouts[0]._id)
    //console.log('workout_id', body.workout_id)
    user.favourite_workouts = user.favourite_workouts.filter(workout => workout._id.toString() !== body.workout_id)
    await user.save()

    response.json(user.toJSON())
})

module.exports = favouriteWorkoutRouter