import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

export default function BrowseCategories() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [category, setCategory] = useState(null)
    const [classes, setClasses] = useState([])

    useEffect(() => {
        getCategory()
        getClasses()
    }, [])

    const getCategory = async () => {
        const response = await axios.get('/api/category/' + id)
        console.log(response)
        setCategory(response.data)
    }

    const getClasses = async () => {
        const response = await axios.get('/api/class/category/'+id)
        setClasses(response.data)
    }

    return (
        <div style={{padding: "2rem"}}>
            {category && <h1>{category.title}</h1>}

            <Button variant="contained" color="primary" onClick={() => navigate('/class/create/'+id)}>Create Class</Button>

            <List>
                {classes.map((cls, index) => (
                    <ListItem button onClick={() => navigate(`/class/${cls._id}`)}>
                        <ListItemText primary={cls.title} secondary={
                            <div>
                                <div>Author: {cls.author}</div>
                                <div>Created at: {cls.createdAt}</div>
                            </div>
                        } />
                    </ListItem>
                ))}
            </List>
        </div>

    )
}