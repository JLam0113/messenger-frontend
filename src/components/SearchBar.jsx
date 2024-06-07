import { useState, useCallback, useEffect } from 'react';
import { debounce } from "lodash";

function SearchBar({ chatRoomClick }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getUsers = async (searchTerm) => {
        await fetch('http://localhost:3000/user?user=' + searchTerm, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                data.users.forEach((user) => {
                    setUsers(users => [...users, {
                        id: user.id,
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
                    setSearchTerm(e.target.value);
                    if (e.target.value.length > 3) {
                        debounced(e.target.value, 1000);
                    }
                }}
            />
            <ol>
                {users?.map((user) => (
                    <li key={user.id}
                        onClick={chatRoomClick}>
                        {user.username}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default SearchBar
