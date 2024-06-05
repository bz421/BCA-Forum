import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Contexts/AuthContext';
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

export default function ShowClass() {
    const { user, handleLogout } = useContext(AuthContext)
    console.log(user)
    const navigate = useNavigate()
    const [cLass, setCLass] = useState(null)
    const [threads, setThreads] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getClass()
        getThreads()
    }, [])

    const getClass = async () => {
        const response = await axios.get('/api/class/' + id)
        setCLass(response.data)
    }

    const getThreads = async () => {
        const response = await axios.get('/api/thread/class/' + id)
        setThreads(response.data)
    }

    console.log(cLass)
    return (
        <div style={{padding: "2rem"}}>
            {cLass && <h1>{cLass.title}</h1>}

            <Button variant="contained" color="primary" onClick={() => navigate('/thread/create/' + id)}>Create Thread</Button>
            <List>
                {threads.map((thread, index) => (
                    <ListItem key={index} button onClick={() => navigate(`/thread/${thread._id}`)}>
                        <ListItemText primary={
                            <Latex>{thread.title}</Latex>
                        } 
                        secondary={
                            <div>
                                <div>Author: {thread.name}</div>
                                <div>Created at: {thread.createdAt}</div>
                            </div>
                        } />
                    </ListItem>
                ))}
            </List>

        </div>

    )
}