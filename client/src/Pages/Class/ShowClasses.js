import { useState, useEffect, useContext } from 'react'
import AuthContext from '../../Contexts/AuthContext';
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import Icon from "@material-ui/core/Icon"
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem'
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'


const useStyles = makeStyles(theme => ({
    threadBody: {
        display: "flex"
    }

}))

export default function ShowClass() {
    const classes = useStyles()
    const { user, handleLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [cLass, setCLass] = useState(null)
    const [threads, setThreads] = useState([])
    const { id } = useParams()

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

    const handleDelete = async (tid) => {
        const response = await axios.delete('/api/thread/delete/' + tid)
        window.location.reload()
    }

    console.log(cLass)
    return (
        <div style={{ padding: "2rem" }}>
            {cLass && <h1>{cLass.title}</h1>}

            <Button variant="contained" color="primary" onClick={() => navigate('/thread/create/' + id)}>Create Thread</Button>
            <List>
                {threads.map((thread, index) => (
                    <div className={classes.threadBody}>
                        <ListItem key={index} button onClick={() => navigate(`/thread/${thread._id}`)}>
                            <ListItemText primary={
                                <span style={{fontSize: "1.1rem"}}><Latex>{thread.title}</Latex></span>
                            }
                                secondary={
                                    <div>
                                        <div>Last Modified By: {thread.name}</div>
                                        <div>Last Modified At: {thread.createdAt}</div>
                                    </div>
                                } />
                        </ListItem>
                        {(thread && (user._id === thread.userId)) && <Button onClick={() => handleDelete(thread._id)}><DeleteIcon /></Button>}
                    </div>
                ))}
            </List>

        </div>

    )
}