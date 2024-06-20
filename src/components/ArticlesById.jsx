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
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { BookmarkRemove } from "@mui/icons-material";
import { ArticleNotFound } from "./ArticleNotFound";
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from "react-share";
import { CommentPagination } from "./CommentPagination";


export function ArticlesById({setBookmarked, bookmarked}) {

    const [isBookmarked, setIsBookmarked] = useState(false)

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
            for (const article of bookmarked) {
                if (article.article_id === Number(article_id)) {
                    setIsBookmarked(true)
                }
            }
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

    function handleBookmarkAdd(articleToAdd) {
        for (const article of bookmarked) {
            if (article.article_id === articleToAdd.article_id) {
                setAlertMessage('Error, article already bookmarked')
                setShowAlertMessage(true)
               setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
                return
            }
        }
        setBookmarked((currBookmarked) => {
            return [currArticle, ...currBookmarked]
        })
        setIsBookmarked(true)
    }

    function handleBookmarkRemove(articleToRemove) {
        setBookmarked((currBookmarked) => {
            return currBookmarked.filter((article) => {
                return article.article_id !== articleToRemove.article_id
            })
        })
        setIsBookmarked(false)
    }

    const dateObj = new Date(currArticle.created_at)
    const date = dateObj.toDateString() + " " + dateObj.toTimeString().substring(0,8)

    const currentURL = window.location.href

    return (
        <>
        { showAlertMessage && !alertMessage.includes('Error') && alertMessage ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="alert-message">
            {alertMessage}
        </Alert> : null }
        { showAlertMessage && alertMessage.includes('Error') && alertMessage ? <Alert severity="error" className="alert-message">
            {alertMessage}
        </Alert> : null }
        <section className="article lg:flex lg:flex-row">
            <img src={currArticle.article_img_url} className="max-w-[800px] lg:min-w-[600px] lg:mr-[2rem]"/>
            <div>
            <div className='flex items-center justify-between'>
                <Chip id="article-topic" label={currArticle.topic} className="dark:bg-slate-200"/>
                <div className="flex items-center">
                    { !isBookmarked ? <BookmarkAddIcon style={{fontSize: '2rem'}} onClick={() => handleBookmarkAdd(currArticle)} className="hover:text-[#DD3232] hover:cursor-pointer"></BookmarkAddIcon> : <BookmarkRemove style={{fontSize: '2rem'}} onClick={() => handleBookmarkRemove(currArticle)} className="hover:text-[#DD3232] hover:cursor-pointer" ></BookmarkRemove>}
                    <FacebookShareButton url={currentURL} className="w-[2rem] rounded"><FacebookIcon className="w-[1.8rem]" round={true}></FacebookIcon></FacebookShareButton>
                    <TwitterShareButton url={currentURL} className="w-[2rem] rounded"><TwitterIcon className="w-[1.8rem]" round={true}></TwitterIcon></TwitterShareButton>
                    <WhatsappShareButton url={currentURL} className="w-[2rem] rounded"><WhatsappIcon className="w-[1.8rem]" round={true}></WhatsappIcon></WhatsappShareButton>
                </div>
            </div>
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
            </div>
        </section>
        <section className="voting-section ">
            <ArticleVotes currArticle={currArticle}/>
        </section>
        <section className="comment-section ">
            <h2 className="comments-header ml-[2rem]">Comments</h2>
            <Comments setCommentCount={setCommentCount} commentCount={commentCount} setAlertMessage={setAlertMessage} setShowAlertMessage={setShowAlertMessage}
            currArticle={currArticle}/>
        </section>
        </>
    )
}