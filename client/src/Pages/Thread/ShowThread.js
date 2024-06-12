import { useState, useEffect, useContext, useRef } from 'react'
import Button from '@material-ui/core/Button'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';
import axios from 'axios'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import DeleteIcon from '@material-ui/icons/Delete';
import { TextField } from '@material-ui/core'
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import "highlight.js/styles/monokai.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';


hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);



const useStyles = makeStyles(theme => ({
    latex: {
        animation: "$blink 1.25s infinite ease-in-out"
    },

    "@keyframes blink": {
        "0%": {
            color: 'black'
        },
        "50%": {
            color: 'red'
        },

        "100%": {
            color: 'black'
        },
    },

    postBody: {
        display: "flex"
    }
}))

export default function ShowThread() {
    const classes = useStyles()
    const { user, handleLogout } = useContext(AuthContext)
    const [thread, setThread] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [normal, setNormal] = useState(true)
    const { id } = useParams()
    const codeRefs = useRef([])
    const { quill, quillRef } = useQuill();


    useEffect(() => {
        getThread()
        getPosts()
    }, [])

    useEffect(() => {
        posts.forEach((_, index) => {
            if (codeRefs.current[index]) {
                hljs.highlightBlock(codeRefs.current[index]);
            }
        });
    }, [[posts]])

    const getThread = async () => {
        const response = await axios.get('/api/thread/' + id)
        console.log('Getting thread: ' + response)
        setThread(response.data)
    }

    const getPosts = async () => {
        const response = await axios.get('/api/post/thread/' + id, {
            params: {
                page
            }
        })
        if (response.data.length) {
            setPosts(response.data)
            setPage(page + 1)
            setHasMore(true)
        } else {
            setHasMore(false)
        }
    }

    const handleReply = async e => {
        e.preventDefault()
        if (!replyContent) return
        const data = {
            threadId: thread._id,
            content: replyContent,
            userId: user._id,
            name: user.name
        }

        const response = await axios.post('/api/post/create/', data)
        setPosts([...posts, response.data])
        setIsReplying(false)
        setReplyContent('')

        const parentThread = await axios.get('/api/thread/' + thread._id).then(async (resTHR) => {
            const res_thr = await axios.patch('/api/thread/' + resTHR.data._id, {
                createdAt: Date.now(),
                name: user.name
            })
            const parentClass = await axios.get('/api/class/' + resTHR.data.classId).then(async (resCLS) => {
                const res_cls = await axios.patch('/api/class/' + resCLS.data._id, {
                    createdAt: Date.now(),
                    author: user.name
                })
                const parentCat = await axios.get('/api/category/' + resCLS.data.categoryId).then(async (resCAT) => {
                    const res_cat = await axios.patch('/api/category/' + resCAT.data._id, {
                        createdAt: Date.now(),
                        author: user.name
                    })
                })

            })
        })


    }

    const handleDelete = async (pid) => {
        const response = await axios.delete('/api/post/delete/' + pid)
        window.location.reload()
    }

    const navigate = useNavigate()
    // console.log(thread)
    // console.log(!thread)
    // console.log(thread.content)
    // let cont = 'a' + thread.content + ' a'

    // const codeRef = useRef(null);
    // useEffect(() => {
    //     hljs.highlightBlock(codeRef.current);
    //   }, []);

    // const format = (post) => {
    //     return (
    //         (post.content).replaceAll("\\*(.*?)\\*", "<i>$1</i>")
    //     )
    // }

    const primaryContent = (post) => {
        if(((post.content).substring(0,13)) === ("```javascript")) {
            return (
                <SyntaxHighlighter language="javascript" style={atomDark} wrapLines showLineNumbers>
                    {(post.content).substring(13)}
                </SyntaxHighlighter>
            );
        } else if(((post.content).substring(0,7)) === ("```java")) {
            return (
                
                <SyntaxHighlighter language="java" style={atomDark} wrapLines showLineNumbers>
                    {(post.content).substring(7)}
                </SyntaxHighlighter>
                
            );
        } else if(((post.content).substring(0,6)) === ("```cpp")) {
            return (
                <SyntaxHighlighter language="cpp" style={atomDark} wrapLines showLineNumbers>
                    {(post.content).substring(6)}
                </SyntaxHighlighter>
            );
        }  else if(((post.content).substring(0,9)) === ("```python")) {
            return (
                <SyntaxHighlighter language="python" style={atomDark} wrapLines showLineNumbers>
                    {(post.content).substring(9)}
                </SyntaxHighlighter>
            );
        } else {
            return (
                <Latex>{post.content}</Latex>
            )
        }
    }

    return (
        <div style={{ padding: "2rem" }}>
            {thread && <h1><Latex>{thread.title + ' '}</Latex></h1>}

            {(thread && (user._id === thread.userId)) && <p>You are the creator</p>}

            {thread && <p style={{ fontSize: "1.1rem" }}><Latex>{thread.content + ' '}</Latex></p>}
            <List>
                {posts.map((post, index) => (

                    <div className={classes.postBody}>
                        {(post.content).includes("java") ?
                        (
                            <ListItem key={index}>
                                <ListItemText primary={
                                <div style={{fontSize: "13pt"}}>-
                                    <SyntaxHighlighter language="java" style={atomDark} wrapLines showLineNumbers>
                                        {post.content}
                                    </SyntaxHighlighter>-
                                </div>
                            }
                                secondary={
                                    <div>
                                        <div>By {post.name}</div>
                                        <div>Posted at: {post.createdAt}</div>
                                    </div>
                                } />
                            </ListItem>
                        )
                        :
                        (
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
                        )}

                        {(post && (user._id === post.userId)) && <Button onClick={() => handleDelete(post._id)}><DeleteIcon /></Button>}
                    </div>

                ))}
            </List>

            <Button variant="contained" color="primary" disabled={!hasMore} style={{ marginRight: "1rem" }} onClick={getPosts}>Load More</Button>
            <Button variant="contained" color="primary" disabled={isReplying} onClick={() => setIsReplying(true)}>Reply</Button>
            {isReplying && (
                <form onSubmit={handleReply}>
                    {/* <TextField style={{ marginTop: "1rem" }} fullWidth label="Reply" value={replyContent} onChange={e => setReplyContent(e.target.value)} /> */}
                    <textarea placeholder="Body" required value={replyContent} style={{ width: '100%', height: '15vh', fontSize: '0.9rem', marginTop: "10px", resize: "none", fontFamily: "Roboto" }} onChange={e => setReplyContent(e.target.value)}></textarea>
                    <Button type="submit" color="primary" variant="contained" style={{ margin: "15px" }}>Post Reply</Button>
                    <span className={classes.latex} style={{ fontWeight: "bold", marginLeft: "0.5rem" }}><Latex>$\LaTeX$ supported</Latex> (delimit with $)</span>
                </form>
            )}
        </div>

    )
}