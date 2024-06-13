import { useState, useEffect } from 'react';
import '../App.css'

function ChatBox({ selectedChatRoom, user }) {
    const [message, setMessage] = useState('')
    const [messageHistory, setMessageHistory] = useState([])

    useEffect(() => {
        const getMessages = async (url) => {
            await fetch(url, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    // update message history
                })
        }
        getMessages('http://localhost:3000/chatroom/' + selectedChatRoom)
    }, []);

    const sendMessage = async (e) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*"
                },
                credentials: 'include',
                body: JSON.stringify({
                    user: user,
                    chatroom: selectedChatRoom,
                    message: message,
                }),
            };
            await fetch('http://localhost:3000/chatroom', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    // update message history
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="chat">
            <div className="chat-history">

            </div>
            <div className="chat-message clearfix">
                <textarea name="message" id="message" placeholder="Type your message" rows="3"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox
