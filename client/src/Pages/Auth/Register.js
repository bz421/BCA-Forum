import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import duckheart from './Images/duckheart.png'
import validator from 'validator'
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

export default function Register() {
    const classes = useStyles()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    // const [nameError, setNameError] = useState(null)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState(null)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    // const [passwordConfirmationError, setPasswordConfirmationError] = useState(null)

    const handleOnSubmit = async event => {
        event.preventDefault()
        // setNameError(null)
        setEmailError(null)
        setPasswordError(null)
        // setPasswordConfirmationError(null)
        let errors = 0

        // if (!name) {
        //     setNameError("Name is required")    
        //     errors++
        // }

        if (!validator.isEmail(email)) {
            setEmailError('Email must be in correct format')
            errors++
        }

        // if (!password) {
        //     setPasswordError("Password is required")
        //     errors++
        // }

        if (password !== passwordConfirmation) {
            setPasswordError("Passwords don't match")
            errors++
        }

        if (errors) return

        const data = {
            name,
            email,
            password,
        }

        try {
            await axios.post('/api/auth/register', data)
            navigate('/')

        } catch (e) {
            const message = e.response.data.message
            if (message === 'email_exists') {
                setEmailError('User with this email already exists')
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <img src={duckheart} width="60%" alt="duckheart"/>
                </Avatar>

                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={handleOnSubmit}>
                    <TextField
                        required
                        fullWidth
                        label="Name"
                        autoFocus
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField 
                        required
                        fullWidth
                        label="Email Address"
                        autoFocus
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField 
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={!!passwordError}
                        helperText={passwordError}
                    />
                    <TextField
                        required
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={passwordConfirmation}
                        onChange={e => setPasswordConfirmation(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </Container>
    )
}
