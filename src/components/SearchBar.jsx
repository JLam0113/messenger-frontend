import { useState, useCallback } from 'react';
import { debounce } from "lodash";
import { useNavigate } from 'react-router-dom';
import '../App.css';


function SearchBar({ loggedInUserID }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();
    const getUsers = async (searchTerm) => {
        await fetch('http://localhost:3000/user?user=' + searchTerm, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                data.users.forEach((user) => {
                    setUsers(users => [...users, {
                        id: user._id,
                        username: user.username,
                    }])
                })
            })
    }
    const debounced = useCallback(debounce(getUsers, 500), []);

    const chatRoomCreate = async (e) => {
        try {
            const users = [loggedInUserID, e.target.id]
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "*/*"
                },
                credentials: 'include',
                body: JSON.stringify({
                    users: users,
                }),
            };
            await fetch('http://localhost:3000/chatroom', requestOptions)
            navigate(0)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className="search">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setUsers([]);
                    setSearchTerm(e.target.value);
                    if (e.target.value.length > 3) {
                        debounced(e.target.value, 1000);
                    }
                }}
            />
            <div>
                {users?.map((user) => (
                    <button key={user.id}
                        id={user.id}
                        onClick={chatRoomCreate}>
                        {user.username}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default SearchBar
