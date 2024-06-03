import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

export default function BrowseClasses() {
    const [classes, setClasses] = useState([])

    useEffect(() => {
        getClasses()
    }, [])

    const getClasses = async () => {
        const response = await axios.get('/api/class/')
        setClasses(response.data)
    }

    const navigate = useNavigate()
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Browse Classes</h1>

            <Button variant="contained" color="primary" onClick={() => navigate('/class/create')}>Create Category</Button>

            <Divider style={{ margin: "2rem 0" }} />

            <List>
                {classes.map((cat, index) => (
                    <ListItem button onClick={() => navigate(`/class/${cat._id}`)}>
                        <ListItemText primary={cat.title} secondary={
                            <div>
                                <div>Author: {cat.author}</div>
                                <div>Created at: {cat.createdAt}</div>
                            </div>
                        } />
                    </ListItem>
                ))}
            </List>
        </div>

    )
}