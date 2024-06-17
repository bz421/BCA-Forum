import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';
import axios from 'axios'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'


export default function BrowseCategories() {
    const { user, handleLogout } = useContext(AuthContext)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories()
    }, [])

    const [inputText, setInputText] = useState("");

    const inputHandler = (e) => {
      setInputText(e.target.value.toLowerCase());
    };

    const getCategories = async () => {
        const response = await axios.get('/api/category/')
        setCategories(response.data)
    }

    const navigate = useNavigate()
    return (
        <div style={{ padding: "2rem" }}>
            <h1>Browse Categories</h1>

            {/* <div>
                    <h1>Search</h1>
                    <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange = {inputHandler}
                        variant="outlined"
                        fullwidth
                        label="Search"/>
                    </div>
                    <BrowseCategories input={inputText}/>
            </div> */}

            {(user._id === '666af2a6a7682741e4e07d49') && <Button variant="contained" color="primary" onClick={() => navigate('/category/create')}>Create Category</Button>}
            <p>All Categories</p>

            <Divider style={{ margin: "2rem 0" }} />

            <List>
                {categories.map((cat, index) => (
                    
                    <ListItem key={index} button onClick={() => navigate(`/category/${cat._id}`)}>
                        <ListItemText primary={
                            <span style={{fontSize: '1.1rem'}}>
                                {cat.title}
                            </span>
                        } secondary={
                            <div>
                                <div>Last Modified By: {cat.author}</div>
                                <div>Modified At: {new Date(cat.createdAt).toLocaleString()}</div>
                            </div>
                        } />
                    </ListItem>
                ))}
            </List>
        </div>

    )
}