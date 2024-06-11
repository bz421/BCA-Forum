import React, { useContext, useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'


export default function Profile() {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState([])
    // const [posts, setPosts] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const response = await axios.get('/api/profile/' + id)
        setInfo(response.data)
        // console.log(response.data)
    }
   


    if(info) {
        
        console.log(typeof(info.threads))
        console.log(typeof(info.posts))
    }
    return (
        
        <div style={{padding: "2rem"}}>
            <h1>{user.name}</h1>
            <br />
            <h1>Your Threads</h1>
            <div>
            {(info.threads && info.posts) ?
                        (
                            <div>
                                <List>
                                    {info.threads.map((thread, index) => (
                                        <ListItem key={index} button onClick={() => navigate(`/thread/${thread._id}`)}>
                                            <ListItemText primary={
                                                <Latex>{thread.title}</Latex>
                                            } 
                                            secondary={
                                                <div>
                                                    <div>Author: {thread.name}</div>
                                                    <div>Created at: {thread.createdAt}</div>
                                                </div>
                                            } />
                                        </ListItem>
                                    ))}
                                </List>
                                <br />
                                <h1>Your Replies</h1>
                                <List>
                                    {info.posts.map((post, index) => (
                                        <ListItem key={index} button onClick={() => navigate(`/post/${post._id}`)}>
                                            <ListItemText
                                            primary = {
                                                <div>
                                                    <Latex>{post.content}</Latex>
                                                </div>
                                            }
                                            secondary={
                                                <div>
                                                    <div>Author: {post.name}</div>
                                                    <div>Created at: {post.createdAt}</div>
                                                </div>
                                            } />
                                        </ListItem>
                                    ))}
                                </List>
                            </div>
                            
                            
                        )
                        :
                        (
                            <div>
                                <h3>Loading...</h3>
                            </div>
                        )
                        }
            
            </div>
            

        </div>
        
        
    )
}