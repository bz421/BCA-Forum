import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import AuthContext from './Contexts/AuthContext'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './Components/Navbar'

function App() {
  const [user, setUser]  = useState(null)
  const [isInitiated, setIsInitiated] = useState(false)

  const init = () => {
    setIsInitiated(true)
  }

  useEffect( () => {
    init()
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.setItem('token', null)
  }

  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{user, setUser, handleLogout}}>
          <Router>
            <Navbar />

          </Router>
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
