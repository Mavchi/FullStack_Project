/*
import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/workoutDescriptions'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
*/

const workoutDescService = { getAll }
export default workoutDescService