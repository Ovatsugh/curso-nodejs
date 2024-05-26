import styles from './AddPet.module.css'
import api from '../../../utils/api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

//componentes
import PetForm from '../../form/PetForm'

function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const navigate = useNavigate()



    async function registerPet(pet) {
        let msgtype = 'success'
        const formData = new FormData()
        await Object.keys(pet).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])

                }
            } else {
                formData.append(key, pet[key])
            }
        })


        const data = await api.post('pets/create', formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            return res.data

        }).catch((err) => {
            console.log(token)
            msgtype = 'error'
            setFlashMessage('Pet cadastrado com sucesso', msgtype)
            return err.response.data

        })

        setFlashMessage(data.message, msgtype)
        if (msgtype !== 'error') {
            navigate('/pets/mypets')

        }


    }

    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar Pet" />
        </section>
    )
}

export default AddPet 