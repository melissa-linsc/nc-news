import { getArticleComments, deleteComments } from "../utils/api";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import { useParams } from "react-router-dom";
import { NewComment } from "./NewComment";
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentPagination } from "./CommentPagination";
import { CommentVotes } from "./CommentVotes";
import '../styles/ArticlesById.css'

export function Comments({setCommentCount, commentCount, setAlertMessage, setShowAlertMessage, currArticle}) {

    const {article_id} = useParams()
    const { currentUser } = useContext(UserContext)

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [commentPage, setCommentPage] = useState(1)

    useEffect(() => {
        getArticleComments(article_id, commentPage).then((comments) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [article_id, commentPage])

    if (isLoading) {
        return <p>Comments loading...</p>
    }

    if (!comments.length) {
        return <p>No comments yet...</p>
    }

    function handleDelete(commentToRemove) {

       deleteComments(commentToRemove.comment_id).then(() => {
        setAlertMessage('Comment Deleted!')
        setShowAlertMessage(true)
           setTimeout(() => {
            setShowAlertMessage(false)
        }, 4000)
        setComments((currComments) => {
            const filteredComments = currComments.filter((comment) => {
                return comment.comment_id !== commentToRemove.comment_id
            })
            return filteredComments
            })
            const updatedCommentCount = commentCount - 1
            setCommentCount(updatedCommentCount)
       })
       .catch((err)=> {
            setComments(comments)
            setAlertMessage('Error deleting comment, try again later')
            setShowAlertMessage(true)
            setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
       })
     
    }

    return (
        <div className="m-[2rem]">
            <NewComment comments={comments} setComments={setComments} setCommentCount={setCommentCount} commentCount={commentCount}/>
            <ul className="flex content-start">
                {comments.map((comment) => {
                    const dateObj = new Date(comment.created_at)
                    const date = comment.created_at.substring(0,10)
                    const time = dateObj.toTimeString().substring(0,8)

                    const dateTime = date + " " + time

                    return (
                        <li key={comment.comment_id} className="my-[0.5] w-[50rem]">
                        <div className="chat chat-start w-9/10" >
                        <div className="chat-header">
                            {comment.author}
                            <time className="text-xs opacity-50 ml-4 dark:opacity-70">{dateTime}</time>
                        </div>
                        <div className="chat-bubble bg-slate-100 text-[#282a36] dark:bg-[#f8f8f2] dark:text-[#282a36]">
                            {comment.body}
                            { currentUser.username === comment.author ? <DeleteIcon onClick={() => {handleDelete(comment)}} id="deleteComment-icon" className="ml-3"></DeleteIcon> : null}
                        </div>
                        <div className="chat-footer opacity-50">
                            <CommentVotes comment={comment}/>
                        </div>
                        </div>
                        </li>
                    )
                })}
            </ul>
            <CommentPagination currArticle={currArticle} commentPage={commentPage} setCommentPage={setCommentPage}/>
        </div>
    )
}
