import { useState, useEffect, useContext, useRef } from 'react'
import Button from '@mui/material/Button'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';
import axios from 'axios'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { createTheme } from '@mui/material/styles'
// import { ThemeProvider } from '@mui/styles';
import Divider from '@mui/material/Divider'
import { TextField } from '@mui/material'
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import { styled } from '@mui/system'
import cpp from 'highlight.js/lib/languages/cpp';
import "highlight.js/styles/monokai.css";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);

const PostContainer = styled('div')(() => ({
    display: "flex"
}))


export default function ShowThread() {
    const { user, handleLogout } = useContext(AuthContext)
    const [thread, setThread] = useState([])
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [replyContent, setReplyContent] = useState('')
    const [content, setContent] = useState('')
    const [normal, setNormal] = useState(true)
    const { id } = useParams()
    const codeRefs = useRef([])


    const theme = createTheme({
        palette: {
            secondary: {
                main: '#FF0000'
            }
        }
    })

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
        setContent(response.data.content)
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

        const cleanedContent = replyContent.replace(/<[^>]+>/g, '').replace(/\n/g, '<br>')


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

    const handlePostDelete = async (pid) => {
        const response = await axios.delete('/api/post/delete/' + pid)
        window.location.reload()
    }

    const handleThreadDelete = async (tid) => {
        const thread = await axios.get('/api/thread/' + tid)
        const parentCls = thread.data.classId
        const response = await axios.delete('/api/thread/delete/' + tid)
        navigate(`/class/${parentCls}`)
    }

    const navigate = useNavigate()

    const formatting = (text) => {
        const bold = /\*\*(.*?)\*\*/g
        const italic = /\*(.*?)\*/g
        const underline = /\_\_(.*?)\_\_/g;

        text = text.replace(bold, (match, str) => `<b>${str}</b>`)
        text = text.replace(italic, (match, str) => `<i>${str}</i>`)
        text = text.replace(underline, (match, str) => `<u>${str}</u>`)

        return text
    }

    const firstIndex = (content, language) => {
        let whitespace = new Set([" ", "\t", "\n"])
        for (let i = 3 + language.length; i < content.length; i++) {
            if (!whitespace.has(content[i])) {
                return i
            }
        }
    }

    const primaryContent = (post) => {
        const regex = /\$/;
        if ((post.content).substring(0, 3) === "```") {
            const language = (post.content).substring(3, (post.content).indexOf('\n'))
            return (
                <SyntaxHighlighter language={language} style={atomDark} wrapLines showLineNumbers>
                    {(post.content).substring(firstIndex((post.content), language))}
                </SyntaxHighlighter>
            );
        } else if (regex.test(post.content)) {
            return (
                <Latex>
                    {post.content}
                </Latex>
            );
        } else {
            return (
                <div dangerouslySetInnerHTML={{ __html: formatting(post.content) }} />
            );
        }
    }

    //const quill = new Quill('#editor');

    return (
        <div style={{ padding: "2rem" }}>
            {thread && <h1><Latex>{thread.title + ' '}</Latex></h1>}

            {/* {(thread && (user._id === thread.userId)) && <p>You are the creator</p>} */}

            {/* {(thread && (user))} */}
            {(thread && (user._id === thread.userId)) ?
                (
                    <div>
                        <p>You are the creator</p>
                    </div>

                )
                :
                (
                    <div>

                        <p style={{ fontSize: "0.9rem" }}>By {thread.name}</p>
                    </div>


                )
            }


            {thread && <p style={{ fontSize: "1.1rem" }}><Latex>{content.replace(/\n/g, '<br>') + ' '}</Latex></p>}
            {/* <ThemeProvider theme={theme}> */}
            {(thread && (user._id === thread.userId)) && <Button variant="contained" color="secondary" style={{ marginRight: "1rem" }} onClick={() => navigate(`/thread/edit/${id}`)}>Edit Thread</Button>}
            {(thread && (user._id === thread.userId)) && <Button variant="contained" color="error" style={{ marginRight: "1rem" }} onClick={() => handleThreadDelete(id)}>Delete Thread</Button>}
            {/* </ThemeProvider> */}

            <List>
                {posts.map((post, index) => (

                    <PostContainer>
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
                        {(post && (user._id === post.userId)) && <Button onClick={() => navigate(`/post/edit/${post._id}`)}><EditIcon /></Button>}
                        {(post && (user._id === post.userId)) && <Button onClick={() => handlePostDelete(post._id)}><DeleteIcon /></Button>}
                    </PostContainer>

                ))}
            </List>

            <Button variant="contained" color="primary" disabled={!hasMore} style={{ marginRight: "1rem" }} onClick={getPosts}>Load More</Button>
            <Button variant="contained" color="primary" disabled={isReplying} onClick={() => setIsReplying(true)}>Reply</Button>
            {isReplying && (
                <form onSubmit={handleReply}>
                    {/* <TextField style={{ marginTop: "1rem" }} fullWidth label="Reply" value={replyContent} onChange={e => setReplyContent(e.target.value)} /> */}
                    <textarea
                        required
                        placeholder="Body"
                        value={replyContent}
                        style={{
                            width: '100%', height: '15vh', fontSize: '0.9rem', marginTop: "10px", resize: "none", fontFamily: "Roboto"
                        }}
                        onChange={e => setReplyContent(e.target.value)}
                        id="editor"
                    ></textarea>

                    <Button type="submit" color="primary" variant="contained" style={{ margin: "15px" }}>Post Reply</Button>
                    <span sx={{
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
                        }
                    }} style={{ fontWeight: "bold", marginLeft: "0.5rem" }}><Latex>$\LaTeX$ supported</Latex> (delimit with $)</span>
                </form>
            )}
        </div>

    )
}