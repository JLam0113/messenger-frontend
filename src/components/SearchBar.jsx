import { useState, useCallback, useEffect } from 'react';
import { debounce } from "lodash";

function SearchBar({ chatRoomClick }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const getUsers = async (searchTerm) => {
        await fetch('http://localhost:3000/user?user=' + searchTerm, { credentials: 'include' })
            .then((response) => response.json())
            .then((data) => {
                setUsers(users => [...users, {
                    id: data.id,
                    username: data.username,
                }])
            })
    }
    const debounced = useCallback(debounce(getUsers, 500), []);

    useEffect(() => {
        getUsers("");
    }, []);

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    debounced(e.target.value, 1000);
                }}
            />
            <div>
                {users?.map((user) => (
                    <div key={user.id}
                        onClick={chatRoomClick}>
                        {user.username}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchBar
