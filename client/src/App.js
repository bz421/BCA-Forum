import { Fragment } from 'react'
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import AuthContext from './Contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'

import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'

function App() {
  const [user, setUser] = useState(null)
  const [isInitiated, setIsInitiated] = useState(false)

  const init = () => {
    setIsInitiated(true)
  }

  useEffect(() => {
    init()
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.setItem('token', null)
  }

  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{ user, setUser, handleLogout }}>
          <Router>
            <Fragment>
              <Navbar />
              <Routes>
                <Route path="/auth/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/auth/register" element={!user ? <Register /> : <Navigate to="/" />} />
              </Routes>
            </Fragment>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
