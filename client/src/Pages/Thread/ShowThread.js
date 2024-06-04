import { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

export default function ShowThread() {
    const { user, handleLogout } = useContext(AuthContext)
    const [thread, setThread] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getThread()
    }, [])

    const getThread = async () => {
        const response = await axios.get('/api/thread/' + id)
        setThread(response.data)
    }

    const navigate = useNavigate()
    return (
        <div style={{padding: "2rem"}}>
            {thread && <h1>{thread.title}</h1>}
            {(user._id === thread.userId) && <p>You are the creator</p>}
            
            <p>{thread.content}</p>
        </div>

    )
}