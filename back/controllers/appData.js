/*
    Returns appData
    appData = {
        workout_menus = [
            {
                name: "For You",
                workout_ids = [],
                filter = ["personal"],
                workouts = [6017fd12ac151833101a62a2],
            },
            {
                name: "Popular",
                workout_ids = [601a5716f10018ca6c39dba9],
                filter = ["muscle"],
                workouts = [],
            },
        ]
    }
*/

appData_test = {
    workout_menus: [
        {
            name: "For You",
            workout_ids: ['6017fd12ac151833101a62a2'],
            filter: ["personal"],
            workouts: [],
        },
        {
            name: "Popular",
            workout_ids: ["6017fd12ac151833101a62a3"],
            filter: ["muscle"],
            workouts: [],
        },
    ]
}

const jwt = require('jsonwebtoken')
const app = require('../app')
const appDataRouter = require('express').Router()

const Workout = require('../models/workout')

appDataRouter.get('/', async (request, response) => {
    const app_data = appData_test 
    for(let i=0; i < app_data.workout_menus.length; i++){
        const workouts = []
        for(let j=0; j < app_data.workout_menus[i].workout_ids.length; j++){
            const workout = await Workout.findById(app_data.workout_menus[i].workout_ids[j])
            workouts.push(workout.toJSON())
        }
        app_data.workout_menus[i].workouts = workouts
    }
    //console.log(app_data)
    response.json(app_data)
})

module.exports = appDataRouter