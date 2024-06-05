import { useState, useEffect, useContext } from 'react'
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
import { TextField } from '@material-ui/core'

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

    useEffect(() => {
        getThread()
        getPosts()
    }, [])

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
    }

    const navigate = useNavigate()
    // console.log(thread)
    // console.log(!thread)
    // console.log(thread.content)
    // let cont = 'a' + thread.content + ' a'
    return (
        <div style={{ padding: "2rem" }}>
            {thread && <h1><Latex>{thread.title + ' '}</Latex></h1>}

            {(thread && (user._id === thread.userId)) && <p>You are the creator</p>}

            {thread && <p style={{fontSize: "15pt"}}><Latex>{thread.content + ' '}</Latex></p>}
            <List>
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
            </List>

            <Button variant="contained" color="primary" disabled={!hasMore} style={{ marginRight: "1rem" }} onClick={getPosts}>Load More</Button>
            <Button variant="contained" color="primary" onClick={() => setIsReplying(true)}>Reply</Button>
            {isReplying && (
                <form onSubmit={handleReply}>
                    <TextField style={{ marginTop: "1rem" }} fullWidth label="Reply" value={replyContent} onChange={e => setReplyContent(e.target.value)} />
                    <Button type="submit">Post Reply</Button>
                    <span className={classes.latex} style={{ fontWeight: "bold", marginLeft: "0.5rem" }}><Latex>$\LaTeX$ supported</Latex> (delimit with $)</span> 
                </form>
            )}
        </div>

    )
}