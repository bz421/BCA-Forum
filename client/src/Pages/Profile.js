import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import AuthContext from '../Contexts/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Profile() {
    const { user } = useContext(AuthContext);
    const [info, setInfo] = useState([])
    // const [posts, setPosts] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {
        const response = await axios.get('/api/profile/' + id)
        setInfo(response.data)
    }



    if (info) {

        console.log(typeof (info.threads))
        console.log(typeof (info.posts))
    }
    return (

        <div style={{ padding: "2rem" }}>
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
                                            <span style={{ fontSize: "1.1rem" }}><Latex>{thread.title}</Latex></span>
                                        }
                                            secondary={
                                                <div>
                                                    <div>Last Modified By: {thread.name}</div>
                                                    <div>Last Modified At: {new Date(thread.createdAt).toLocaleString()}</div>
                                                </div>
                                            } />
                                    </ListItem>
                                ))}
                            </List>
                            <br />
                            <h1>Your Replies</h1>
                            <List>
                                {info.posts.map((post, index) => (
                                    <div>
                                        {(post.content).includes("```java") ?
                                            (
                                                <ListItem key={index}>
                                                    <ListItemText primary={
                                                        <div style={{ fontSize: "1.05rem" }}>
                                                            <SyntaxHighlighter language="java" style={atomDark} wrapLines showLineNumbers>
                                                                {post.content}
                                                            </SyntaxHighlighter>
                                                        </div>

                                                    }
                                                        secondary={
                                                            <div style={{ fontSize: "0.8rem" }}>
                                                                <div>By {post.name}</div>
                                                                <div>Posted at: {new Date(post.createdAt).toLocaleString()}</div>
                                                            </div>
                                                        } />
                                                </ListItem>

                                            )
                                            :
                                            (
                                                <ListItem key={index}>
                                                    <ListItemText primary={
                                                        <div style={{ fontSize: "1.05rem" }}>
                                                            <Latex>{post.content}</Latex>
                                                        </div>

                                                    }
                                                        secondary={
                                                            <div style={{ fontSize: "0.8rem" }}>
                                                                <div>By {post.name}</div>
                                                                <div>Posted at: {new Date(post.createdAt).toLocaleString()}</div>
                                                            </div>
                                                        } />
                                                </ListItem>
                                            )}
                                    </div>
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