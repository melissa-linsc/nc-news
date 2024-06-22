import { postUser } from "../utils/api"
import { Button } from "@mui/material"
import { useState, useEffect } from "react"

export function PostUser({users, setUsers, setCurrentUser, setSignUp}) {

    const [newUserInput, setNewUserInput] = useState({username:'', name:'', avatar_url:''})

    const [validUsernameInput, setValidUsernameInput] = useState(true)
    const [validNameInput, setValidNameInput] = useState(true)

    function handleChange(event) {
        setNewUserInput({...newUserInput, [event.target.name] : event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()

        const newUser = newUserInput

        const usernameRegex = /^[A-Za-z0-9]+$/
        const nameRegex = /^[A-Za-z\s]+$/

        let isValidUsername = usernameRegex.test(newUser.username)
        let isValidName = nameRegex.test(newUser.name)

        if (isValidName && !isValidUsername) {
            setValidUsernameInput(false)
        }
        else if (!isValidName && isValidUsername) {
            setValidNameInput(false)
        }
        else {
            postUser(newUser).then((user)=> {
                setCurrentUser(user)
                setUsers([user, ...users])
            }).catch((err) => {
                setUsers(users)
            })
            setNewUserInput({username:'', name:'', avatar_url:''})
            setSignUp(false)
        }
    }


    return (
        <section className="signup flex justify-center items-center flex-col">
            <h3 className="font-extrabold text-3xl text-center py-4">Sign Up</h3>
            <form className="flex flex-col w-[50vw] min-w-[18rem]"  onSubmit={handleSubmit} >

                <label htmlFor="username" className="m-0 p-0">Username *</label>
                <input required type='text' className="input input-bordered border-[#DD3232] mb-[1rem] p-0 border-2" name="username" id="username" onChange={handleChange} value={setNewUserInput.username}></input>
                {!validUsernameInput ? <p>Username must contain only alphanumeric characters, and no whitespace.</p> : null}

                <label htmlFor="name">Name *</label>
                <input required type='text' className="input input-bordered border-[#DD3232] m-0 p-0 border-2" name="name" id="name" onChange={handleChange} value={newUserInput.name}></input>
                {!validNameInput ? <p>Name must contain only letters and spaces</p> : null}

                <label htmlFor="avatar_url" className="mt-[1rem]">Avatar Image URL</label>
                <input type='url' className="input input-bordered border-[#DD3232]  border-2" name="avatar_url" id="avatar_url" onChange={handleChange}  value={newUserInput.avatar_url}></input>

                <button type="submit" 
                className='mb-[3rem] p-3 rounded-lg bg-[#DD3232] text-white my-[2rem]' >Post</button>
            </form>
        </section>
    )
}