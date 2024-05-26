import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

export default function BrowseCategories() {
    const [category, setCategory] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getCategory()
    }, [])

    const getCategory = async () => {
        const response = await axios.get('/api/category/' + id)
        console.log(response)
        setCategory(response.data)
    }

    const navigate = useNavigate()
    return (
        <div style={{padding: "2rem"}}>
            {category && <h1>{category.title}</h1>}

        </div>

    )
}