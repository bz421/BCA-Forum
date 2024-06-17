import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import {Link} from 'react-router-dom';
import BCALogo from './imgs/BCA_colorLogo.png'


export default function MenuAppBar() {
    const navigate = useNavigate()
    const { user, handleLogout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const logout = () => {
        handleClose()
        handleLogout()
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

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
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{height: "100px"}}>
                <Toolbar>
                    <Link to=""
                        style={{
                            flexGrow: 1,
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            alignItems: "center",
                            //justifyContent: "center",
                            height: "100%"
                        }}
                    >
                        <img src={BCALogo} style={{height:"50%", margin: "10px"}} />
                        <Typography variant="h6" style={{fontSize: "30px"}}>
                            <b>BCA</b> Forum
                        </Typography>
                    </Link>
                    <Button
                        style={{
                            fontSize: "20px"
                        }}
                        color="inherit"
                        onClick={() => navigate('/category/')}>
                        Categories
                    </Button>
                    {user ?
                        (
                            <div>
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    style={{fontSize: "20px"}}
                                >
                                    {user.name}
                                </Button>
                                
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => navigate('/profile/' + user._id)}>Profile</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                    
                                </Menu>
                            </div>
                            
                        )
                        :
                        (
                            <div>
                                <Button
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                    style={{ fontSize: "20px" }}
                                >
                                    Account
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleLogin}>Login</MenuItem>
                                    <MenuItem onClick={handleRegister}>Register</MenuItem>
                                </Menu>
                            </div>
                        )
                    }

                </Toolbar>
            </AppBar>
        </Box>
    );
}
