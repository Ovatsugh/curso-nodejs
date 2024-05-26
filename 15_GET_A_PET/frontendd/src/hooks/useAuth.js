//api
import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'


export default function useAuth() {

    const [authenticated, setAuthenticated] = useState(false)
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            api.defaults.headers.Authorization = `bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user) {


        let msgText = 'Cadastro realizado com Sucesso!'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((res) => {
                return res.data
            })
            await authUser(data)
        } catch (err) {
            msgText = err.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)


    }


    async function authUser(user) {
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(user.token))
        navigate('/')
    }

    async function login(user) {
        let msgText = "Login realizado com sucesso"
        let msgType = "success"
        try {
            const data = await api.post('/users/login', user).then((res) => {
                return res.data
            })
            await authUser(data)
            setAuthenticated(true)
        } catch (err) {
            msgText = err.response.data.message
            msgType = 'error'
        }
        setFlashMessage(msgText, msgType)


    }


    function logout() {
        const msgText = "Logout realizado com sucesso"
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)

    }

    return { authenticated, register, logout, login}

}
