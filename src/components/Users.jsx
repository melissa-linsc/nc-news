import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import { getUsers } from "../utils/api";
import { CircularProgress } from "@mui/material";
import '../styles/Users.css'
import { FloatingActionBtn } from "./FloatingActionBtn";
import { PostUser } from "./PostUser";

export function Users() {

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const [signUp, setSignUp] = useState(false)

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users)
            setIsLoading(false)
        })
    })

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="primary" />                
            </div>
        )
    }

    function handleLogInClick(user) {
        setCurrentUser(user)
        setSignUp(false)
    }

    function handleSignUpClick() {
        setSignUp(true)
    }

    return (
    <section className='user-page'>
        {currentUser.username ? <h1 className="font-extrabold text-3xl text-center py-4">Hello {currentUser.username}!</h1> : <h1 className="font-extrabold text-3xl text-center py-4">Hello!</h1>}
        {signUp ? <PostUser users={users} setUsers={setUsers} setCurrentUser={setCurrentUser} setSignUp={setSignUp}/> : null}
        <h2 className="font-extrabold text-3xl text-center py-4">Log In</h2>
        <ul className='user-list'>
            {users.map((user) => {
                return <li key={user.username} onClick={() => handleLogInClick(user)}>
                        <img src={user.avatar_url} className="dark:bg-white" alt="avatar image"/>
                    <p id="username">{user.username}</p>
                </li>
            })}
        </ul>
        <div className="flex justify-center pb-[3rem]">
            <button className="text-[#DD3232] dark:text-white" onClick={handleSignUpClick}>New user? Sign Up Here</button>
        </div>
        <div className='fixed bottom-5 right-5 p-[1rem]'>
                <FloatingActionBtn/>
        </div> 
    </section>
    )
}