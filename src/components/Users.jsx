import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import { getUsers } from "../utils/api";
import { CircularProgress } from "@mui/material";
import '../styles/Users.css'

export function Users() {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
            setIsLoading(false)
        })
    })

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="secondary" />                
            </div>
        )
    }

    return (
    <section className='user-page'>
        <h2>Users</h2>
        {currentUser.length ? <h3>Current User: {currentUser}</h3> : null}
        <ul className='user-list'>
            {users.map((user) => {
                return <li key={user.username} onClick={() => setCurrentUser(user.username)}>
                    <img src={user.avatar_url} />
                    <p id="username">{user.username}</p>
                </li>
            })}
        </ul>
    </section>
    )
}