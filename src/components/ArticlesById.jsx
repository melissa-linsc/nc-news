import { getArticleById } from "../utils/api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Comments } from "./Comments";
import { ArticleVotes } from "./ArticleVotes";
import { NewComment } from "./NewComment";
import '../styles/ArticlesById.css'
import Chip from '@mui/material/Chip';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CircularProgress } from "@mui/material";

export function ArticlesById() {

    const {article_id} = useParams()

    const [currArticle, setCurrArticle] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getArticleById(article_id).then((article) => {
            setCurrArticle(article)
            setIsLoading(false)
        })
    }, [article_id])

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
            <p id="article-commentCount">Comments: {currArticle.comment_count}</p>
        </section>
        <section className="voting-section">
            <ArticleVotes currArticle={currArticle}/>
        </section>
        <section className="comment-section">
            <h2>Comments</h2>
            <Comments />
        </section>
        </>
    )
}