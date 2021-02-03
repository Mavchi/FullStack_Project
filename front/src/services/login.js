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

        const userdata = await getUserData(token)

        window.location.reload(false)
        return userdata
    } catch (error) {
        console.log(error)
        return null
    }
}

const getUserData = async new_token => {
    try {
        console.log('getUserData->')
        console.log('token:', new_token)
        setToken(new_token)

        const config = {
            headers: { Authorization: token }
        }
        const response = await axios.get(baseUrlUsers, config)
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