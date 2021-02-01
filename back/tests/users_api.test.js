const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Workout = require('../models/workout')
const helper = require('./test_helper')

const test_workouts = require('./test_workouts')

const api = supertest(app)
/*
describe('workouts - general', () => {
    beforeEach(async () => {
        await Workout.deleteMany({})

        const workoutObjects = test_workouts.map(workout => new Workout(workout))
        const workoutPromises = workoutObjects.map(async (workout) => await workout.save())
        await Promise.all(workoutPromises)
    })

    test('all workouts are returned', async () => {
        workoutsInDb = await helper.workoutsInDb()
        expect(workoutsInDb).toHaveLength(test_workouts.length)
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', name: 'Aleksi', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})
*/
describe('favourite workouts', () => {

    test('possible to favourite workout', async () => {
        const user_id = '6017fd14ac151833101a62a6'
        const user = await User.findById(user_id)
        user.favourite_workouts = []
        await User.findByIdAndUpdate(user.id, user, { new: true })

        const req = {
            workout_id: '6017fd12ac151833101a62a3',
            userId: '6017fd14ac151833101a62a6',
        }

        const userAtStart = await User.findById(req.userId)
        expect(userAtStart.favourite_workouts).toHaveLength(0)

        const result = await api
            .post('/api/favourite_workouts')
            .send(req)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await User.findById(req.userId)
        expect(userAtEnd.favourite_workouts).toHaveLength(1)
    })

    test('cant favourite same workout twice', async () => {
        const req = {
            workout_id: '6017fd12ac151833101a62a3',
            userId: '6017fd14ac151833101a62a6',
        }

        const userAtStart = await User.findById(req.userId)
        expect(userAtStart.favourite_workouts).toHaveLength(1)

        const result = await api
            .post('/api/favourite_workouts')
            .send(req)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await User.findById(req.userId)
        expect(userAtEnd.favourite_workouts).toHaveLength(1)
    })

    test('cant delete with wrong workout_id', async () => {
        const req = {
            workout_id: '612312312321',
            userId: '6017fd14ac151833101a62a6',
        }

        const userAtStart = await User.findById(req.userId)
        expect(userAtStart.favourite_workouts).toHaveLength(1)

        const result = await api
            .delete('/api/favourite_workouts')
            .send(req)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await User.findById(req.userId)
        //console.log('toimiikohan', userAtEnd.favourite_workouts)
        expect(userAtEnd.favourite_workouts).toHaveLength(1)
    })

    test('can delete workout from favourites', async () => {
        const req = {
            workout_id: '6017fd12ac151833101a62a3',
            userId: '6017fd14ac151833101a62a6',
        }

        const userAtStart = await User.findById(req.userId)
        expect(userAtStart.favourite_workouts).toHaveLength(1)

        const result = await api
            .delete('/api/favourite_workouts')
            .send(req)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const userAtEnd = await User.findById(req.userId)
        console.log('userin workoutit poiston jälkeen', userAtEnd.favourite_workouts)
        expect(userAtEnd.favourite_workouts).toHaveLength(0)
    })
})

afterAll(() => {
    mongoose.connection.close()
})