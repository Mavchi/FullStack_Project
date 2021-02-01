const User = require('../models/user')
const Workout = require('../models/workout')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const workoutsInDb = async () => {
    const workouts = await Workout.find({})
    return workouts.map(w => w.toJSON())
}

module.exports = {
    usersInDb,
    workoutsInDb,
}