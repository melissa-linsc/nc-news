import { postComment } from "../utils/api";
import { useState, useContext } from "react";
import { UserContext } from "./UserProvider";
import { useParams } from "react-router-dom";
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
            </form> : <p id="login-comment-msg">Login to leave a comment</p>}
            <p>{successMessage}</p>
        </section>
    )
}