import axios from 'axios'
import favouriteWorkoutsService from './favourite_workouts'
const baseUrl = 'http://localhost:3003/api/login'


const login = async credentials => {
    const response = await axios.post(baseUrl, credentials)

    // update tokens
    favouriteWorkoutsService.setToken(response.data.token)

    return response.data
}

const loginService = {
    login,
}

export default loginService