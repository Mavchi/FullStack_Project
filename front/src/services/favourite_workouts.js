import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/favourite_workouts'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const config = {
        headers: { Authorization: token}
    }
    const response = await axios.get(baseUrl, config)
    console.log('response.data: ', response.data)
    return response.data
}

const favouriteWorkoutsService = { setToken, getAll }
export default favouriteWorkoutsService