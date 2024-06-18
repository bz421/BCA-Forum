import { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../../Contexts/AuthContext';
import List from '@mui/material/List'
import { styled } from '@mui/system'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        oldSecondary: {
            main: "#ff4081",
            light: "#f6a5c0",
            dark: "#aa647b"
        }
    }
})

const ClassContainer = styled('div')(() => ({
    display: "flex"
}))

export default function ShowCategory() {
    const { user, handleLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    const { id } = useParams()
    const [category, setCategory] = useState(null)
    const [classes, setClasses] = useState([])
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
        const response = await axios.get('/api/class/category/' + id)
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
        <div style={{ padding: "2rem" }}>
            {category && <h1>{category.title}</h1>}
            {user._id === '666af2a6a7682741e4e07d49' && <Button variant="contained" color="primary" onClick={() => navigate('/class/create/' + id)}>Create Class</Button>}
            <p>All Classes</p>

            <Divider style={{ margin: "2rem 0" }} />

            <List>
                {classes.map((cls, index) => (
                    <ClassContainer>
                        <ListItem button onClick={() => navigate(`/class/${cls._id}`)}>
                            <ListItemText primary={
                                <span style={{ fontSize: "1.1rem" }}>{cls.title}</span>
                            }
                                secondary={
                                    <div>
                                        <div>Last modified by: {cls.author}</div>
                                        <div>Last modified at: {new Date(cls.createdAt).toLocaleString()}</div>
                                    </div>
                                } />
                        </ListItem>
                        <HeartButton cid={cls._id} />

                    </ClassContainer>

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

        <ThemeProvider theme={theme}>

            <Button onClick={() => handleHeart(cid)}>
                {/* {setHToggle()} */}
                <FavoriteIcon color={(hToggle) ? "oldSecondary" : "disabled"} />
            </Button>
        </ThemeProvider>
    );

}


// 665a4e3030b256c1a3efeabd
// 666a5ca062c5fd5f1ff9d6dc
