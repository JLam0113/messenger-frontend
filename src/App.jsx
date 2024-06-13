import { useState, useEffect } from 'react';
import Login from "./components/Login";
import ChatRoom from "./components/ChatRoom";
import ChatBox from "./components/ChatBox";
import SearchBar from "./components/SearchBar";
import './App.css'


function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState({})
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
    setSelectedChatRoom(e.target.id)
  }

  // use effect for chatroom connection?

  return (
    <div className="container clearfix">
      {auth ? <>
        <SearchBar chatRoomCreate loggedInUserID={user.id} />
        <ChatRoom user={user} chatRoomClick={chatRoomClick} selectedChatRoom={selectedChatRoom} />
        <ChatBox selectedChatRoom={selectedChatRoom} user={user} />
      </>
        : <Login />}
    </div>
  );
}

export default App
