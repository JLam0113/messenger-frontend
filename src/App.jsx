import { useState, useEffect } from 'react';
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import SearchBar from "./components/SearchBar";


function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState('')
  const [messages, setMessages] = useState([])

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

  const chatRoomClick = async (e) => {
    try {
      await fetch('http://localhost:3000/chatroom/' + e.target.id)
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  // use effect for chatroom connection?

  return (
    <>
      {auth ? <><SearchBar chatRoomClick={chatRoomClick}/> <ChatRoom user={user} chatRoomClick={chatRoomClick} /></>
        : <Login />}
    </>
  );
}

export default App
