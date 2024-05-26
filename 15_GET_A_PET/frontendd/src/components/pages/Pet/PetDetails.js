import styles from './PetDetails.module.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

// hooks
import useFlashMessage from '../../../hooks/useFlashMessage'

function PetDetails() {
    const [pet, setPet] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')


    useEffect(() => {
        api.get(`/pets/${id}`).then((res) => {
            setPet(res.data.pet)
        })
    }, [id])

    async function schedule() {
        let msgType = 'success'

        const data = await api({
            method: 'patch',
            url: `/pets/schedule/${pet._id}`,
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((res) => {
            return res.data
        })
            .catch((err) => {
                msgType = 'error'
                return err.response.data
            })

        console.log(data.message)
        console.log(token)

        setFlashMessage(data.message, msgType)

    }

    return (
        <>
            {pet.name && (
                <section className={styles.pet_details_container}>
                    <div>
                        <h1>Conhecendo o pet: {pet.name}</h1>
                        <p>Se tiver interesse marque uma visita para conhecelo</p>
                    </div>

                    <div className={styles.pet_images}>
                        {pet.images.map((image, index) => (
                            <img src={`http://localhost:5000/images/pets/${image}`}
                                alt={pet.name} key={index} />
                        ))}
                    </div>
                    <p>
                        <span className="bold">Peso: {pet.weight}kg</span>
                    </p>
                    <p>
                        <span className="bold">Idade: {pet.age} anos</span>
                    </p>

                    {token ? (
                        <button onClick={schedule}>Solicitar uma visita</button>
                    ) : (
                        <p>Você precisa <Link to="/register">criar uma conta</Link> para solicitar a visita</p>
                    )}
                </section>
            )}
        </>
    )

}

export default PetDetails