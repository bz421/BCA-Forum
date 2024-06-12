import React, { useContext, useEffect } from 'react';

import '../home.css';
import AuthContext from '../Contexts/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
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
import catMock from './Auth/Images/categoryMockup.png'
import clsMock from './Auth/Images/clsMockup.png'
import thrMock from './Auth/Images/threadMockup.png'
import latexLogo from './Auth/Images/latex.png'



import Divider from '@material-ui/core/Divider'
import Latex from 'react-latex-next';
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
        // <div className="TotalDiv" style={{padding: "2rem", backgroundImage: "./duckheart.png"}}>
        <div style={{padding: "2rem"}}>
            <h1 data-aos ="fade-right" style={{fontSize:"3rem", textAlign:"center"}}>Welcome to BCA Forum!</h1>
            {
                user ? 
                (
                    <div>
                        <br />
                        <div data-aos="fade-right">
                            <h2 style={{textAlign:"center"}}>Check out some class categories, or your profile.</h2>
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
                        <h1 style={{textAlign:"center "}}>Register or login to get started.</h1>
                        <br />
                        <div id="buttonCenter">
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
                        <div id="info">
                            <div class="mockPic" data-aos="fade-right">
                                <img src={catMock} id="catMock" alt="Device mockup for categories"/>

                            </div>
                            <div class="mockText" data-aos="fade-right">
                                <h2>BCA Forum is organized into categories, so users can easily access their classes.</h2>
                            </div>
                            <div class="mockText" data-aos="fade-left">
                                <h2>Categories are further organized into classes.</h2>
                            </div>
                            <div class="mockPic" data-aos="fade-left">
                                <img src={clsMock}  id="clsMock" alt="Device mockup for classes"/>
                            </div>
                            
                            <div class="mockPic" data-aos="fade-right">
                                <img src={thrMock} id="thrMock" alt="Device mockup for threads"/>

                            </div>
                            <div class="mockText" data-aos="fade-right">
                                <h2>Users can select which class they're in and post threads for that class there. <br /> They can also see threads other students have created.</h2>
                            </div>
                            <div class="mockText" data-aos="fade-left">
                                <h2>Threads can be replied to by other users. <br /><br /> BCA Forum supports <Latex>$Latex$</Latex> formatting, among various other text formatting features.</h2>
                                
                            </div>
                            <div class="mockPic" data-aos="fade-left">
                                <img src={latexLogo} alt="Latex Logo" id="lateL" />

                            </div>
                            
                        </div>
                        
                    </div>
                
                )
            }
        </div>
    )
}