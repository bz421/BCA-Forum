import { useContext, useState, useEffect } from 'react'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';


const EditPost = () => {
    const { user, handleLogout } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [post, setPost] = useState(null)
    console.log(id)

    useEffect(() => {
        getPost()
    }, [])

    const getPost = async () => {
        console.log("Getting post")
        const response = await axios.get('/api/post/' + id).then((res) => setPost(res.data))
    }


    const handleOnEdit = async e => {
        e.preventDefault()
        const response = await axios.get('/api/post/' + id)
        // console.log(response.data)
        const cleanedContent = content.replace(/<[^>]+>/g, '')

        const res_post = await axios.patch('/api/post/' + id, {
            content: cleanedContent
        })




        const parentThread = await axios.get('/api/thread/' + response.data.threadId).then(async (resTHR) => {
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

        navigate('/thread/' + response.data.threadId)
    }

    // console.log(parentCls)
    // console.log(parentCat)
    return (
        <>
            <div style={{ padding: "2rem" }}>
                <h1 style={{ marginBottom: '2rem' }}>Edit Post</h1>

                <form onSubmit={handleOnEdit}>
                    <textarea placeholder="Content" required defaultValue={post && post.content} style={{ width: '100%', height: '10vh', resize: "none", fontSize: '1.05rem', fontFamily: "Roboto" }} onChange={e => setContent(e.target.value)}></textarea>
                    <Button type="submit" variant="contained" color="primary">Edit</Button>
                    <pre>
                        <code>
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
                        </code>
                    </pre>


                </form>
            </div>
        </>
    )
}

export default EditPost