import { useState, useEffect } from 'react'

import formStyles from '../../form/Form.module.css'
import Styles from './Profile.module.css'
import Input from '../../form/input'
import api from '../../../utils/api'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../Layouts/RoundedImage'

function Profile() {
    const [user, setUser] = useState({})
    const [preview, setpreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((res) => {
            setUser(res.data)
        })


    }, [token])

    useEffect(() => {
        console.log(`http://localhost:5000/images/users/${user.image}`)
    })

    function onFileChange(e) {
        setUser({ ...user, [e.target.name]: e.target.files[0] })
        setpreview(e.target.files[0])

    }

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })

    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'
        let msgText = 'Usuário atualizado com sucesso'
        const formData = new FormData()
        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        await api.patch(`users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            msgText = 'erro ao atualizar usuário'
            return err.response.data

        })

        setFlashMessage(msgText, msgType)

    }

    return (
        <section>
            <div className={Styles.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage src={preview ? URL.createObjectURL(preview) : `http://localhost:5000/images/users/${user.image}`} alt={user.name} />
                )}

            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>

                <Input
                    text="Image"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />

                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu email"
                    handleOnChange={handleOnChange}
                    value={user.email || ''}

                />

                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleOnChange}
                    value={user.name || ''}

                />

                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleOnChange}
                    value={user.phone || ''}

                />

                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleOnChange}
                />

                <Input
                    text="Confirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleOnChange}
                />
                <input type="submit" value="Editar" />

            </form>
        </section>
    )
}

export default Profile