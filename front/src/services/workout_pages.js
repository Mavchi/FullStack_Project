/*
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/workoutDescriptions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
*/
const getAll = () => {
    const workout = {
        "name": "Upper Body",
        "pro": "true",
        "level": "Beginner",
        "cardio": "2",
        "muscle": "1",
        "img": "https://images.unsplash.com/photo-1581009137042-c552e485697a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }

    const tabs = [
        {
            name: "For You",
            type: "list",
            workouts_id: [],
            filter: ["Bodybuilding"],
            workouts: [...workout]
        },
        {
            name: "Popular",
            type: "filter",
            workouts_id: [],
            filter: ["Bodybuilding"],
            workouts: [...workout]
        }
    ]
    return tabs
}

const workoutPageService = { getAll }
export default workoutPageService