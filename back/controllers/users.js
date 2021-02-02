const bcrypt = require('bcrypt')
const { response } = require('../app')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const lodash = require('lodash') 

const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('favourite_workouts')
    response.json(users.map(u => u.toJSON()))
})

// returns complete, filled out User-object (including favourite workouts, logs etc)
usersRouter.get('/:username', async (request, response) => {
    // make sure user id's match
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    //console.log('decodedToken:', decodedToken)
    if( !token || !decodedToken.id || decodedToken.username !== request.params.username) {
        return response.status(401).json({ error: 'token missing or invalid'})
    }
    
    const user = await User
        .findById( decodedToken.id )
        .populate('favourite_workouts')
    //console.log('1', user.favourite_workouts[0])
    //console.log('2',user.favourite_workouts[0].toJSON())
    //console.log('before map', user)
    const workouts = []
    for( i in user.favourite_workouts.map(w => w.toJSON()) ){
        console.log('workout', user.favourite_workouts[i].toJSON())
        workouts.push(lodash.cloneDeep(user.favourite_workouts[i].toJSON()))
    }
    /*
    user.favourite_workouts = user.favourite_workouts.map(w => {
        //w.description = {...w.description}.toJSON()
        const workout = lodash.cloneDeep(w)
        workout.description = lodash.cloneDeep(w.description.toJSON())
        console.log(workout)
        return workout
    })
    */
    jsonUser = user.toJSON()
    jsonUser.favourite_workouts = lodash.cloneDeep(workouts)
    console.log('aftr map', jsonUser)
    response.json(jsonUser)
})

module.exports = usersRouter