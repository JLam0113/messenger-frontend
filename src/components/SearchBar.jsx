import { useState, useCallback } from 'react';
import { debounce } from "lodash";

function SearchBar({ chatRoomCreate }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

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

    return (
        <div>
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
