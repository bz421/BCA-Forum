import { useState, useContext } from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import duckheart from './Images/duckheart.png'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(1)
    },

    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}))

export default function SignIn() {
    const navigate = useNavigate()

    const {setUser} = useContext(AuthContext)
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)

    const handleOnSubmit = async e => {
        e.preventDefault()
        let errors = 0
        setEmailError(null)
        setPasswordError(null)

        const data = {
            email,
            password
        }

        try {
            const response = await axios.post('/api/auth/login', data)
            const {token, user} = response.data
            console.log(`${typeof (token)}: ${token}`)
            localStorage.setItem('token', token)
            setUser(user)
            navigate('/')
            
        } catch (e) {
            const message = e.response.data.message
            if (message === 'user_not_found') {
                setEmailError('Wrong email')
            }
            else if (message === 'wrong_password') {
                setPasswordError('Wrong password')
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img src={duckheart} width="60%" alt="duckheart" />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleOnSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    )
}
