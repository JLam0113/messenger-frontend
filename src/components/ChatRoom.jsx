import { useState, useEffect } from 'react';

function ChatRoom({ chatRoomClick }) {
    const [chatRooms, setChatRooms] = useState([])

    useEffect(() => {
        const getChatRooms = async (url) => {
            await fetch(url, { credentials: 'include' })
                .then((response) => response.json())
                .then((data) => {
                    setChatRooms(chatRooms => [...chatRooms, {
                        id: data.id,
                        username: data.username,
                    }])
                })
        }
        getChatRooms('http://localhost:3000/chats')
    }, []);

    return (
        <>
            {chatRooms.map(element => (
                <li key={element.id}
                    id={element.id}
                    onClick={chatRoomClick} >
                    {element.username}
                </li>
            ))}
        </>
    )
}

export default ChatRoom
