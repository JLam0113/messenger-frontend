import { useState, useEffect, useRef } from 'react';
import { io } from "socket.io-client"
import '../App.css'

function ChatBox({ selectedChatRoom, user }) {
    const [message, setMessage] = useState('')
    const [messageHistory, setMessageHistory] = useState([])
    const [socket, setSocket] = useState(null);
    const chatHistory = useRef(null)

    useEffect(() => {
        setMessageHistory([])
        const getMessages = async (url) => {
            await fetch(url, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    data?.messages?.forEach((message) => {
                        setMessageHistory(messageHistory => [...messageHistory, {
                            id: message?._id,
                            user: message?.user.username,
                            message: message?.message,
                            date: message?.date,
                        }])
                    })
                })
        }
        getMessages('http://localhost:3000/chatroom/' + selectedChatRoom)
    }, []);

    useEffect(() => {
        setSocket(io("http://localhost:3000"));
    }, [])

    useEffect(() => {

        socket?.emit("addUser", user?.id);

        socket?.on("getMessage", message => {
            setMessageHistory(messageHistory => [...messageHistory, {
                id: message?._id,
                user: message?.user.username,
                message: message?.message,
                date: message?.date,
            }])

        })
    }, [socket])

    useEffect(() => {
        chatHistory.current?.scrollIntoView({ behavior: "instant" })
    }, [messageHistory])

    const sendMessage = async (e) => {
        e.preventDefault()
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
                    socket?.emit("sendMessage", {
                        id: data.response._id,
                        chatroom: selectedChatRoom,
                        user: user.id,
                        message: data.response.message,
                        date: data.response.date,
                    });
                })
            setMessage('')
            chatHistory.current?.scrollIntoView({ behavior: "instant" })

        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="chat">
            <div className="chat-history">
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
                <div ref={chatHistory} />
            </div>
            <div className="chat-message clearfix">
                <textarea name="message" id="message" placeholder="Type your message" rows="3"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    value={message} />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox
