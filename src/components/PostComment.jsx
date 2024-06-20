import { postComment } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "./UserProvider";
import { useParams, Link } from "react-router-dom";
import '../styles/NewComment.css'
import { TextField, Button } from "@mui/material";

export function NewComment({comments, setComments, setCommentCount, commentCount}) {

    const [commentInput, setCommentInput] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const {article_id} = useParams()
    const { currentUser } = useContext(UserContext)

    function handleChange(event) {
        setCommentInput(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newComment = {body: commentInput, username: currentUser.username}
        setCommentInput('')
    
        postComment(article_id, newComment).then((comment) => {
            setSuccessMessage('Comment Posted!')
            const updatedCommentCount = commentCount + 1
            setCommentCount(updatedCommentCount)
            setComments([comment, ...comments])
        }).catch((err) => {
            setSuccessMessage('Error commenting, please try again later')
        })
    }

    return (
        <section className="newComment-section">
            { currentUser.username ? <form onSubmit={handleSubmit} id="newComment-form">
                <label htmlFor="comment-input"></label>
                <TextField type="text" placeholder="Add comment" name="comment-input" id="comment-input" value={commentInput} onChange={handleChange} variant="filled" required className="border-white dark:bg-white dark:opacity-60"></TextField>
                <Button type="submit"  id="newComment-button">Post</Button>
            </form> : <div className="flex flex-col justify-center text-center pb-[1rem] my-0" >
            <h2 className="font-bold p-[1rem]">Login to leave a comment</h2>
              <Link to='/users' className="max-w-[20rem] m-auto"><button className="p-[0.8rem] rounded-lg bg-[#DD3232] text-white">Login</button></Link>
        </div>}
            <p>{successMessage}</p>
        </section>
    )
}