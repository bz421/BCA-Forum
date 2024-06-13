import { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../Contexts/AuthContext';
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
    const { user, handleLogout } = useContext(AuthContext)
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
    // const handleHeart = async (clid) => {
    //     // setHToggle(!hToggle);
    //     const data = {
    //         // userId
    //     }
    //     const response = await axios.patch('/api/class/heart/' + clid, data)
    // }

    return (
        <div style={{padding: "2rem"}}>
            {category && <h1>{category.title}</h1>}
            {user._id === '666af2a6a7682741e4e07d49' && <Button variant="contained" color="primary" onClick={() => navigate('/class/create/' + id)}>Create Class</Button>}
            <p>All Classes</p>

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
                        <HeartButton cid={cls._id}/>

                    </div>
                    
                ))}

            </List>

        </div>

    )
}

function HeartButton(cid) {
    console.log(cid.cid)
    const { user, handleLogout } = useContext(AuthContext)
    console.log(user.heartedClasses)
    const [hToggle, setHToggle] = useState((user.heartedClasses.includes(cid.cid)));
    // function changeColor() {
    //     // setHToggle(!hToggle);
    // }
    const handleHeart = async () => {
        setHToggle(!hToggle);
        console.log('hToggle: ' + hToggle)
        const currentArray = user.heartedClasses
        console.log(currentArray)
        if (hToggle) {
            currentArray.splice(currentArray.indexOf(cid.cid), 1)
            console.log('Unhearting: ' + currentArray)
            const response = await axios.patch('/api/auth/changeheart/' + user._id, {
                heartedClasses: currentArray
            })
        }
        else {
            console.log(cid)
            currentArray.push(cid.cid)
            const response = await axios.patch('/api/auth/changeheart/' + user._id, {
                heartedClasses: currentArray
            })
        }
    }

    return (
        
        <Button onClick={() => handleHeart(cid)}>
            {/* {setHToggle()} */}
            <FavoriteIcon color={(hToggle) ? "secondary" : "disabled"}/>
        </Button>
    );

}


// 665a4e3030b256c1a3efeabd
// 666a5ca062c5fd5f1ff9d6dc
