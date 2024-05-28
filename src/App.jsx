import { useState, useEffect } from 'react';
import './App.css'
import Login from "./componenets/Login";

function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    const getAuth = async (url) => {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setAuth(true)
          setUser(data)
        })
    }
    getAuth('http://localhost:3000/auth')
  }, []);

  return (
    <>
    {auth ? user + 'Logged in' : <Login />}
    </>
  );
}

export default App
