import { useState, useEffect } from 'react';
import '../App.css'

function ChatRoom({ user, chatRoomClick, selectedChatRoom }) {
    const [chatRooms, setChatRooms] = useState([])

    useEffect(() => {
        const getChatRooms = async (url) => {
            await fetch(url, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    data.chatrooms.map((chatRoom) => {
                        if (chatRoom.id !== undefined || chatRoom.users !== undefined) {
                            const users = chatRoom.users.map((element) => {
                                if (user.username !== element.username)
                                    return element.username;
                            }).filter((username) => {
                                return typeof username === 'string'
                            })
                            setChatRooms(chatRooms => [...chatRooms, {
                                id: chatRoom._id,
                                users: users,
                            }])
                        }
                    })
                })
        }
        getChatRooms('http://localhost:3000/chatroom?id=' + user.id)
    }, []);

    return (
        <div className="people-list">
            <ul className="list">{chatRooms.length > 0 ? chatRooms.map(element => (
                <li className={selectedChatRoom == element.id ? "clearfix active" : "clearfix"} key={element.id}
                    id={element.id}
                    onClick={chatRoomClick} >
                    {element.users}
                </li>
            )) : ''}</ul>
        </div>
    )
}

export default ChatRoom
