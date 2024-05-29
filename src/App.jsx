import { useState, useEffect } from 'react';
import Login from "./components/Login";

function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    const getAuth = async (url) => {
      await fetch(url, { credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
          setAuth(true)
          setUser(data.username)
        })
    }
    getAuth('http://localhost:3000/auth')
  }, []);

  return (
    <>
      {auth ? user + ' is logged in' : <Login />}
    </>
  );
}

export default App
