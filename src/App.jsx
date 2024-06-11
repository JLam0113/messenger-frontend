import { useState, useEffect } from 'react';
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import ChatBox from "./components/ChatBox";
import SearchBar from "./components/SearchBar";
import './App.css'


function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})
  const [messages, setMessages] = useState([])
  const [selectedChatRoom, setSelectedChatRoom] = useState('')

  useEffect(() => {
    const getAuth = async (url) => {
      await fetch(url, { credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
          setAuth(true)
          setUser({ username: data.username, id: data.id })
        })
    }
    getAuth('http://localhost:3000/auth')
  }, []);

  const chatRoomClick = async (e) => {
    try {
      await fetch('http://localhost:3000/chatroom/' + e.target.id, { credentials: 'include' })
        .then((response) => response.json())
        .then((data) => {
          setSelectedChatRoom(e.target.id)
          console.log(data)
        })
    } catch (err) {
      console.log(err.message)
    }
  }

  // use effect for chatroom connection?

  return (
    <div className="container clearfix">
      {auth ? <>
        <SearchBar chatRoomCreate loggedInUserID={user.id} />
        <ChatRoom user={user} chatRoomClick={chatRoomClick} selectedChatRoom={selectedChatRoom} />
        <ChatBox />
      </>
        : <Login />}
    </div>
  );
}

export default App
