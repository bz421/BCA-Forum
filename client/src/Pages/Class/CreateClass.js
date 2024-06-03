import {useContext} from 'react'
import { useState, useEffect } from 'react'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';


const CreateClass = () => {
    const { user, handleLogout } = useContext(AuthContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')

    const handleOnSubmit = async e => {
        e.preventDefault()
        const name = user.name

        const data = {
            title,
            name,
            categoryId: id
        }

        const response = await axios.post('/api/class/create', data)
        const {_id} = response.data
        navigate('/class/' + _id)
    }
    return (
        <div style={{padding: "2rem"}}>
            <h1 style={{ marginBottom: '2rem' }}>Create Class</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>
    )
}

export default CreateClass