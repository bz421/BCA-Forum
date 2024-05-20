import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import AuthContext from './Contexts/AuthContext'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

function App() {
  const [user, setUser]  = useState(null)
  const [isInitiated, setIsInitiated] = useState(false)

  const handleLogout = () => {
    setUser(null)
    localStorage.setItem('token', null)
  }

  return (
    <div>
      {isInitiated && (
        <AuthContext.Provider value={{user, setUser, handleLogout}}>
          
        </AuthContext.Provider>
      )}
    </div>
  );
}

export default App;
