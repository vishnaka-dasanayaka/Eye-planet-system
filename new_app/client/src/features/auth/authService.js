import axios from 'axios'
import { url } from '../../config'

const API_URL = `${url}/api/users/`

// add user
const register = async (userData) => {
    const responce = await axios.post(`${API_URL}`, userData)

    if (responce.data) {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }

    return responce.data
}

// login user
const login = async (userData) => {
    const responce = await axios.post(`${API_URL}login`, userData)

    if (responce.data) {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }

    return responce.data
}

//Log out
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login
}

export default authService