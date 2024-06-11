import { useState, useEffect } from 'react';

function ChatRoom({ user, chatRoomClick }) {
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
                            console.log(users)
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
        <>
            {chatRooms.length > 0 ? chatRooms.map(element => (
                <li key={element.id}
                    id={element.id}
                    onClick={chatRoomClick} >
                    {element.users}
                </li>
            )) : ''}
        </>
    )
}

export default ChatRoom
