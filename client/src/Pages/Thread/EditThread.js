import { useContext, useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';


const EditThread = () => {
    const { user, handleLogout } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [thread, setThread] = useState(null)

    useEffect(() => {
        getThread()
    }, [])

    const getThread = async () => {
        console.log('Getting thread')
        const response = await axios.get('/api/thread/' + id).then((res) => {
            setThread(res.data)
            setTitle(res.data.title)
        })
    }

    const handleOnSubmit = async e => {
        e.preventDefault()
        const cleanedTitle = title.replace(/<[^>]+>/g, '')
        const cleanedContent = content.replace(/<[^>]+>/g, '')
        const response = await axios.get('/api/thread/' + id)

        const data = {
            title: cleanedTitle,
            content: cleanedContent,
            createdAt: Date.now(),
            userId: user._id,
            name: user.name
        }

        const res_thr = await axios.patch('/api/thread/' + id, data)

        const parentClass = await axios.get('/api/class/' + response.data.classId).then(async (resCLS) => {
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

        navigate('/class/' + response.data.classId)
    }

    // console.log(parentCls)
    // console.log(parentCat)
    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ marginBottom: '2rem' }}>{`Edit Thread "${thread && thread.title}"`}</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField label="Title" key="2" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Body" required defaultValue={thread && thread.content} style={{ width: '100%', height: '20vh', resize: "none", fontSize: '1.05rem', fontFamily: "Roboto" }} onChange={e => setContent(e.target.value)}></textarea>
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
    )
}

export default EditThread