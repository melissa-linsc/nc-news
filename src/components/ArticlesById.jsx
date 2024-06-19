import { getArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Comments } from "./Comments";
import { ArticleVotes } from "./ArticleVotes";
import '../styles/ArticlesById.css'
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress } from "@mui/material";
import { ArticleNotFound } from "./ArticleNotFound";


export function ArticlesById() {

    const {article_id} = useParams()

    const [currArticle, setCurrArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [commentCount, setCommentCount] = useState(currArticle.comment_count)
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const [error, setError] = useState(false)

    useEffect(() => {setCommentCount(currArticle.comment_count)}, [currArticle.comment_count])

    useEffect(() => {
        getArticleById(article_id).then((article) => {
            setError(false)
            setCurrArticle(article)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
        })
    }, [article_id])

    if (error) {
        return <ArticleNotFound />
    }

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="secondary" />                
            </div>
        )
    }

    const dateObj = new Date(currArticle.created_at)
    const date = dateObj.toDateString() + " " + dateObj.toTimeString().substring(0,8)

    return (
        <>
        { showAlertMessage && !alertMessage.includes('Error') && alertMessage ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="alert-message">
            {alertMessage}
        </Alert> : null }
        { showAlertMessage && alertMessage.includes('Error') && alertMessage ? <Alert severity="error" className="alert-message">
            {alertMessage}
        </Alert> : null }
        <section className="article">
            <img src={currArticle.article_img_url} />
            <Chip id="article-topic" label={currArticle.topic} />
            <h2 id="article-title">{currArticle.title}</h2>
            <div className="date-and-author">
                <p id="article-date">{date}</p>
                <div className="article-author">
                    <AccountCircleIcon></AccountCircleIcon>
                    <p id="article-username">{currArticle.author}</p>
                </div>
            </div>
            <p id="article-body">{currArticle.body}</p>
            <p id="article-commentCount">Comments: {commentCount}</p>
        </section>
        <section className="voting-section">
            <ArticleVotes currArticle={currArticle}/>
        </section>
        <section className="comment-section">
            <h2 className="comments-header">Comments</h2>
            <Comments setCommentCount={setCommentCount} commentCount={commentCount} setAlertMessage={setAlertMessage} setShowAlertMessage={setShowAlertMessage}/>
        </section>
        </>
    )
}