import { Fragment } from 'react'
import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'
import AuthContext from './Contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Components/Navbar'

import Login from './Pages/Auth/Login'
import Register from './Pages/Auth/Register'
import Home from './Pages/Home'
import CreateCategory from './Pages/Category/CreateCategory'
import BrowseCategories from './Pages/Category/BrowseCategories'
import ShowCategory from './Pages/Category/ShowCategory'

function App() {
  const [user, setUser] = useState(null)
  const [isInitiated, setIsInitiated] = useState(false)

  const init = async () => {
    const token = localStorage.getItem('token')
    console.log(`${typeof (token)}: ${token}`)
    if (token && token !== 'null') {
      const response = await axios.get('/api/auth/init', { params: { token } })
      const { user } = response.data
      setUser(user)
    }
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
                <Route path="/" exact element={<Home />} />
                <Route path="/auth/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/auth/register" element={!user ? <Register /> : <Navigate to="/" />} />
                <Route path="/category/create" element={user ? <CreateCategory /> : <Navigate to="/auth/login" />} />
                <Route path="/category/:id" element={user ? <ShowCategory /> : <Navigate to="/auth/login" />} />
                <Route path="/category/" element={user ? <BrowseCategories /> : <Navigate to="/auth/login" />} />

              </Routes>
            </Fragment>
          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
