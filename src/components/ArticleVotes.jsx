import { patchArticleVotes } from '../utils/api';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from 'react';

export function ArticleVotes({currArticle}) {

    const [votes, setVotes] = useState(currArticle.votes)
    const [errorMessage, setErrorMessage] = useState('')

    function handleUpvoteClick() {
        const updatedVotes = votes + 1
        setVotes(updatedVotes)

        const newVotes = {
            inc_votes: 1
        }

        patchArticleVotes(currArticle.article_id, newVotes).then((article) => {
            setVotes(article.votes)
        })
        .catch((err) => {
            setErrorMessage('Error voting, please try again later')
            setVotes(votes)
        })
    }

    function handleDownvoteClick() {
        const updatedVotes = votes - 1
        setVotes(updatedVotes)

        const newVotes = {
            inc_votes: -1
        }

        patchArticleVotes(currArticle.article_id, newVotes).then((article) => {
            setVotes(article.votes)
        })
        .catch((err) => {
            setErrorMessage('Error voting, please try again later')
            setVotes(votes)
        })
    }

    return (
        <>
            <ThumbUpIcon className="vote-button
            hover:cursor-pointer" onClick={() => handleUpvoteClick()}></ThumbUpIcon>
                <p>{votes}</p>
            <ThumbDownIcon className="vote-button
            hover:cursor-pointer" onClick={() => {
                handleDownvoteClick()
            }}></ThumbDownIcon>
            <p>{errorMessage}</p>
        </>
    )
}