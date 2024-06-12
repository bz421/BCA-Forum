import { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import List from '@material-ui/core/List'
import {makeStyles} from '@material-ui/core/styles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import FavoriteIcon from '@material-ui/icons/Favorite'

const useStyles = makeStyles(theme => ({
    classBody: {
        display: "flex"
    }
}))

export default function ShowCategory() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [category, setCategory] = useState(null)
    const [classes, setClasses] = useState([])
    const clss = useStyles()
    // const [hToggle, setHToggle] = useState(false)

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
    const handleHeart = async (clid) => {
        // setHToggle(!hToggle);
        const data = {
            // userId
        }
        const response = await axios.patch('/api/class/heart/' + clid, data)
    }

    return (
        <div style={{padding: "2rem"}}>
            {category && <h1>{category.title}</h1>}
            <Button variant="contained" color="primary" onClick={() => navigate('/class/create/' + id)}>Create Class</Button>

            <Divider style={{ margin: "2rem 0" }} />

            <List>
                {classes.map((cls, index) => (
                    <div className={clss.classBody}>
                        <ListItem button onClick={() => navigate(`/class/${cls._id}`)}>
                            <ListItemText primary={
                                <span style={{fontSize: "1.1rem"}}>{cls.title}</span>
                            } 
                            secondary={
                                <div>
                                    <div>Last modified by: {cls.author}</div>
                                    <div>Last modified at: {new Date(cls.createdAt).toLocaleString()}</div>
                                </div>
                            } />
                        </ListItem>
                        <Button onClick={() => handleHeart(cls._id)}><HeartButton /></Button>

                    </div>
                    
                ))}

            </List>

        </div>

    )
}

function HeartButton() {
    const [hToggle, setHToggle] = useState(false);
    function changeColor() {
        setHToggle(!hToggle);
    }

    return (
        <FavoriteIcon onClick={changeColor} color={hToggle ? "secondary" : "disabled"}/>
    );

}