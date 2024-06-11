import React, { useContext } from 'react';
import '../home.css';
import AuthContext from '../Contexts/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import Divider from '@material-ui/core/Divider'
// import BrowseCategories from './BrowseCategories'

export default function Home() {
    const { user } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogin = () => {
        handleClose()
        navigate('/auth/login')
    }

    const handleRegister = () => {
        handleClose()
        navigate('/auth/register')
    }
    return (
        <div style={{padding: "2rem"}}>
            <h1>Welcome to BCA Forum!</h1>
            {
                user ? 
                (
                    <div>
                        <br />

                    </div>
                )
                :
                (
                    <div>
                        <br />
                        <h1>Register or login to get started.</h1>
                        <br />
                        <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleRegister}
                                    color="inherit"
                                    className = 'regLog'
                                >
                                    Register
                        </Button>
                        <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleLogin}
                                    color="inherit"
                                    className = 'regLog'
                                >
                                    Login
                        </Button>
                    </div>
                
                )
            }
            
            
                <h1>Home</h1>

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
                </div>
                <Divider style={{ margin: "2rem 0" }} /> */}
            
  
        </div>
    )
}