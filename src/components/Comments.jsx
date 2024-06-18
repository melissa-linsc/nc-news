import { getArticleComments } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewComment } from "./NewComment";
import '../styles/ArticlesById.css'

export function Comments({setCommentCount, commentCount}) {

    const {article_id} = useParams()

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticleComments(article_id).then((comments) => {
            setComments(comments)
            setIsLoading(false)
        })
    }, [article_id])

    if (isLoading) {
        return <p>Comments loading...</p>
    }

    if (!comments.length) {
        return <p>No comments yet...</p>
    }

    return (
        <>
            <NewComment comments={comments} setComments={setComments} setCommentCount={setCommentCount} commentCount={commentCount}/>
            <ul>
                {comments.map((comment) => {
                    const dateObj = new Date(comment.created_at)
                    const date = comment.created_at.substring(0,10)
                    const time = dateObj.toTimeString().substring(0,8)

                    const dateTime = date + " " + time

                    return <li key={comment.comment_id}>
                        <p id="comment-body">{comment.body}</p>
                        <div id="comment-info">
                            <div>
                                <p id="comment-author">{comment.author}</p>
                                <p id="comment-date">{dateTime}</p>
                            </div>
                            <p id="comment-votes">votes: {comment.votes}</p>
                        </div>
                    </li>
                })}
            </ul>
        </>
    )
}
