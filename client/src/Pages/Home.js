import React, { useContext, useEffect } from 'react';

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
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


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
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <div style={{padding: "2rem"}}>
            <h1 data-aos ="fade-right">Welcome to BCA Forum!</h1>
            {
                user ? 
                (
                    <div>
                        <br />
                        <div data-aos="fade-right">
                            <h2>Check out some class categories, or your profile.</h2>
                            <br />
                            <div id="loggedInBtns">
                                <Button color="primary" variant="contained" onClick={() => navigate('/category/')} >
                                    Categories
                                </Button>
                                <Button color="primary" variant="contained" onClick={() => navigate('/profile/' + user._id)}>
                                    Profile
                                </Button>
                            </div>
                            
                        </div>
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
        </div>
    )
}