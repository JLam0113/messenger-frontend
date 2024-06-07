import { useState, useEffect } from 'react';

function ChatRoom({ user, chatRoomClick }) {
    const [chatRooms, setChatRooms] = useState([])

    useEffect(() => {
        const getChatRooms = async (url) => {
            await fetch(url, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    if (data.id !== undefined || data.username !== undefined) {
                        setChatRooms(chatRooms => [...chatRooms, {
                            id: data.id,
                            username: data.username,
                        }])
                    }
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
                    {element.username}
                </li>
            )) : ''}
        </>
    )
}

export default ChatRoom
