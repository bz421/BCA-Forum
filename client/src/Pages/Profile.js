import React, { useContext } from 'react';
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


export default function Profile() {
    const { user } = useContext(AuthContext);
    return (
        <div style={{padding: "2rem"}}>
            <h1>{user.name}</h1>
            <br />
            <h1>Classes</h1>
            <br />
            <h1>Posts</h1>

        </div>
        
        
    )
}