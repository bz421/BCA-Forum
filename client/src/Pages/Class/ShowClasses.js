import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

export default function BrowseClasses() {
    const [cLass, setCLass] = useState([])
    const {id} = useParams()

    useEffect(() => {
        getClass()
    }, [])

    const getClass = async () => {
        const response = await axios.get('/api/class/' + id)
        console.log(response)
        setCLass(response.data)
    }

    const navigate = useNavigate()
    return (
        <div style={{padding: "2rem"}}>
            {cLass && <h1>{cLass.title}</h1>}

        </div>

    )
}