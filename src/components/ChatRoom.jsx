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
                            setChatRooms(chatRooms => [...chatRooms, {
                                id: chatRoom.id,
                                users: chatRoom.users,
                            }])
                        }
                    })
                })
        }
        getChatRooms('http://localhost:3000/chatroom?id=' + user.id)
    }, []);

    return (
        <>
            <ol>{chatRooms.length > 0 ? chatRooms.map(element => (
                <li key={element.id}
                    id={element.id}
                    onClick={chatRoomClick} >
                    {element.users}
                </li>
            )) : ''}
            </ol></>
    )
}

export default ChatRoom
