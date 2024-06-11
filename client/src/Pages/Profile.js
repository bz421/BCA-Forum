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
    
    
    // function isJsonString(str) {
    //     try {
    //         JSON.parse(str);
    //     } catch (e) {
    //         return false;
    //     }
    //     return true;
    // }
    // let str = info.threads;
    // console.log(info);
    // // console.log(typeof(str));
    // if(typeof(str) === 'string') {
    //     console.log(str);
    //     // let jso = str.split(/(},)/);
    //     // for(let i = 0; i < jso.length; i++) {
    //     //     if(jso[i] === "},") {
    //     //         jso.splice(jso.indexOf("},"));
    //     //         i--;
    //     //     }
    //     //     else {
    //     //         jso[i] += "}";
    //     //     }
    //     //     console.log(jso);
    //     // }
    //     str = str.replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ');
    //     // console.log(isJsonString(correctJson));
    //     // console.log(correctJson);
    //     // let corectJason = JSON.stringify(str);
    //     // for(let i = 0; i < corectJason.length; i++) {
    //     //     console.log(corectJason);
    //     // }
        
    //     str = str.replace(/new ObjectId\('([^']+)'\)/g, '"$1"');

    //     // Step 2: Surround the string with square brackets to make it a JSON array
    //     str = `[${str}]`;

    //     // Step 3: Parse the string into a JavaScript array
    //     console.log(str);
    //     let arr = JSON.parse(str);

    //     console.log(arr);

    //     // console.log(str);
        
    //     // console.log(jso);
    // }
    // // let threa = info.threads.split(",");
    
    // // console.log(isJsonString(threa[0]));
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
            {/* <List>
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
            </List> */}

            
            {/* <List>
                {posts.map((post, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={
                            <div style={{fontSize: "13pt"}}>
                                <Latex>{post.content}</Latex>
                            </div>

                        }
                            secondary={
                                <div>
                                    <div>By {post.name}</div>
                                    <div>Posted at: {post.createdAt}</div>
                                </div>
                            } />
                    </ListItem>
                ))}
            </List> */}
            </div>
            

        </div>
        
        
    )
}