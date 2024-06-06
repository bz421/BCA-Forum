import { useContext, useState, useEffect } from 'react'
import { TextField } from '@material-ui/core'
import Latex from 'react-latex-next'
import 'katex/dist/katex.min.css'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';


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

const CreateThread = () => {
    const classes = useStyles()
    const { user, handleLogout } = useContext(AuthContext)
    const { id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [parentCls, setParentCls] = useState(null)
    const [parentCat, setParentCat] = useState(null)

    const handleOnSubmit = async e => {
        e.preventDefault()
        const name = user.name

        const data = {
            title,
            content,
            userId: user._id,
            classId: id,
            name
        }

        const response = await axios.post('/api/thread/create', data)
        const { _id } = response.data
        const time = response.data.createdAt

        const cls = await axios.get('/api/class/' + id)
        setParentCls(cls.data)

        const res_cls = await axios.patch('/api/class/' + id, {
            createdAt: time
        })

        // const cat = await axios.get('/api/category/' + cls.data.categoryId)
        // setParentCat(cat.data)

        // const res_cat = await axios.patch('/api/category/' + cat.data._id, {
        //     createdAt: time
        // })

        navigate('/thread/' + _id)
    }

    console.log(parentCls)
    console.log(parentCat)
    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ marginBottom: '2rem' }}>Create Thread</h1>

            <form onSubmit={handleOnSubmit}>
                <TextField label="Title" required fullWidth margin="normal" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Body" required value={content} style={{ width: '100%', height: '250px', fontSize: '0.9rem' }} onChange={e => setContent(e.target.value)}></textarea>
                <Button type="submit" variant="contained" color="primary">Create</Button>
                <span className={classes.latex} style={{ fontWeight: "bold", marginLeft: "0.5rem" }}><Latex>$\LaTeX$ supported</Latex> (delimit with $)</span>

            </form>
        </div>
    )
}

export default CreateThread