import { getArticleComments } from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/ArticlesById.css'

export function Comments() {

    const {article_id} = useParams()

    const [comments, setComments] = useState([])

    useEffect(() => {
        getArticleComments(article_id).then((comments) => {
            setComments(comments)
        })
    }, [article_id])

    if (!comments.length) {
        return <p>No comments yet...</p>
    }

    return (
        <>
            <h2>Comments</h2>
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
