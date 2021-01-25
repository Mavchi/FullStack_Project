const express = require('express')
const app = express()

let workout_descriptions = [{
        id: 1,
        name: 'Upper Body',
        pro: true,
        level: 'Beginner',
        cardio: 2,
        muscle: 1,
        img: 'https://images.unsplash.com/photo-1581009137042-c552e485697a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
      }
]

app.get('/api/workout_descriptions', (request, response) => {
    response.json(workout_descriptions)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})