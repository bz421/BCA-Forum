import { useContext, useState, useEffect } from 'react'
import {TextField} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';


const CreateThread = () => {
    const { user, handleLogout } = useContext(AuthContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const handleOnSubmit = async e => {
        e.preventDefault()
        const name = user.name

        const data = {
            title,
            content,
            userId: user._id,
            classId: id,
            name
        }

        const response = await axios.post('/api/thread/create', data)
        const {_id} = response.data
        navigate('/thread/' + _id)
    }
    return (
        <div style={{padding: "2rem"}}>
            <h1 style={{ marginBottom: '2rem' }}>Create Thread</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)}/>
                <textarea placeholder="Content Textbox" required value={content} style={{width: '100%', height: '250px'}} onChange={e => setContent(e.target.value)}>

                </textarea>
                <Button type="submit" variant="contained" color="primary">Create</Button>
            </form>
        </div>
    )
}

export default CreateThread