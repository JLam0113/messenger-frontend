import { useState, useEffect, useRef } from 'react';
import '../App.css'

function ChatBox({ selectedChatRoom, user }) {
    const [message, setMessage] = useState('')
    const [messageHistory, setMessageHistory] = useState([])
    const chatHistory = useRef(null)

    useEffect(() => {
        const getMessages = async (url) => {
            await fetch(url, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    data.messages.map((message) => {
                        setMessageHistory(messageHistory => [...messageHistory, {
                            id: message._id,
                            user: message.user.username,
                            message: message.message,
                            date: message.date,
                        }])
                    })
                })
        }
        getMessages('http://localhost:3000/chatroom/' + selectedChatRoom)
    }, []);

    // TODO SCROLL TO BOTTOM OF CHAT BOX
    useEffect(() => {
        chatHistory.current.scrollIntoView({ behavior: 'smooth' })
    }, [messageHistory])

    const sendMessage = async (e) => {
        setMessage('')
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
                    setMessageHistory(messageHistory => [...messageHistory, {
                        id: data.response._id,
                        user: user.username,
                        message: data.response.message,
                        date: data.response.date,
                    }])
                })
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="chat">
            <div className="chat-history" ref={chatHistory}>
                <ul className="">
                    {messageHistory.length > 0 ? messageHistory.map(element => (
                        <li key={element.id} id={element.id}>
                            {element.user == user.username ?
                                <div className="message-data align-right">
                                    <span className="message-data-time">{element.date}</span>
                                    <span className="message-data-name">{element.user}</span>
                                </div> :
                                <div className="message-data">
                                    <span className="message-data-name">{element.user}</span>
                                    <span className="message-data-time">{element.date}</span>
                                </div>
                            }
                            <div className={element.user == user.username ? "message other-message float-right" : "message my-message"}>
                                {element.message}
                            </div>
                        </li>
                    )) : ''}
                </ul>
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
