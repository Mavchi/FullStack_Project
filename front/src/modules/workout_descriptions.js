import axios from 'axios'
const baseUrl = '/api/workout_descriptions'

const getAll = () => {
    const request = axios.get(baseUrl)
    request.then(response => response.data)
}

const workoutDescService = { getAll }
export default workoutDescService