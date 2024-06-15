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
                    console.log(selectedChatRoom)
                    console.log(data)
                    data.messages.map((message) => {
                        setMessageHistory(messageHistory => [...messageHistory, {
                            id: message._id,
                            user: message.user.username,
                            message: message.message,
                            date: message.date,
                        }])
                    })
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
                    user: user.id,
                    chatroom: selectedChatRoom,
                    message: message,
                }),
            };
            await fetch('http://localhost:3000/message', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    setMessageHistory(messageHistory => [...messageHistory, {
                        id: data.response._id,
                        user: user.username,
                        message: data.response.message,
                        date: data.response.date,
                    }])
                    // update message history
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="chat">
            <div className="chat-history">
            <ul className="">{messageHistory.length > 0 ? messageHistory.map(element => (
                <li className="" key={element.id}
                    id={element.id}
                     >
                    {element.user}
                    <br></br>
                    {element.message}
                    <br></br>
                    {element.date}
                </li>
            )) : ''}</ul>
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
