import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },

}))

export default function MenuAppBar() {
    const classes = useStyles()
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
        <div className={classes.root}>
            <AppBar position="static" style={{height: "100px"}}>
                <Toolbar style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Link to=""
                        className={classes.title}
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            display: "flex",
                            alignItems: "center",
                            //justifyContent: "center",
                            height: "100%"
                        }}
                    >
                        <img src="BCA_colorLogo.png" style={{height:"50%", margin: "10px"}} />
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
        </div>
    );
}
