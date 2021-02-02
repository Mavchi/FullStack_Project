import axios from 'axios'

const baseUrlLogin = 'http://localhost:3003/api/login'
const baseUrlUsers = 'http://localhost:3003/api/users'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const login = async credentials => {
    try {
        const response = await axios.post(baseUrlLogin, credentials)
        // update tokens
        setToken(response.data.token)
        console.log('login returns', response.data)

        window.localStorage.setItem(
            'loggedKFITappUser', JSON.stringify(response.data.token)
        )

        const userdata = await getUserData(response.data)
        return userdata
    } catch (error) {
        console.log(error)
        return null
    }
}

const getUserData = async login_data => {
    try {
        console.log('getUserData->')
        //console.log('token:', login_data.token)
        setToken(login_data.token)

        const config = {
            headers: { Authorization: token }
        }
        const response = await axios.get(`${baseUrlUsers}/${login_data.username}`, config)
        console.log('response.data: ', response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

const loginService = {
    login, getUserData, setToken
}

export default loginService