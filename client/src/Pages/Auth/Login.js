import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../Contexts/AuthContext'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import duckheart from './Images/duckheart.png'
import { styled } from '@mui/system'
import { useTheme } from '@mui/material/styles'
import axios from 'axios'
import { ThemeProvider } from '@emotion/react'

const InnerContainer = styled('div')(({theme}) => ({
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}))

export default function SignIn() {
    const navigate = useNavigate()

    const { setUser } = useContext(AuthContext)
    const theme = useTheme()
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
            const { token, user } = response.data
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
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <InnerContainer>
                    <Avatar sx={{
                            margin: theme.spacing(1),
                            bgcolor: '#ff7961',
                    }}>
                        <img src={duckheart} width="60%" alt="duckheart" />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form sx={{
                        width: '100%',
                        marginTop: theme.spacing(1)
                    }}
                        onSubmit={handleOnSubmit}>
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
                            sx={{ margin: theme.spacing(3, 0, 2) }}
                        >
                            Sign In
                        </Button>
                    </form>
                </InnerContainer>
            </Container>
        </ThemeProvider>
    )
}
