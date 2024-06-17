import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import duckheart from './Images/duckheart.png'
import { styled } from '@mui/system'
import validator from 'validator'
import axios from 'axios'
import { ThemeProvider } from '@emotion/react'

const InnerContainer = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))


export default function Register() {
    const theme = useTheme()
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <InnerContainer>
                    <Avatar sx={{
                        margin: theme.spacing(1),
                        backgroundColor: theme.palette.error.main,
                    }}>
                        <img src={duckheart} width="60%" alt="duckheart" />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <form sx={{
                        width: '100%',
                        marginTop: theme.spacing(1)
                    }} onSubmit={handleOnSubmit}>
                        <TextField
                            variant="standard"
                            required
                            fullWidth
                            label="Name"
                            autoFocus
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            variant="standard"
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
                            variant="standard"
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
                            variant="standard"
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
                            sx={{ margin: theme.spacing(3, 0, 2) }}
                        >
                            Register
                        </Button>
                    </form>
            </InnerContainer>
        </Container>
        </ThemeProvider >
    )
}
