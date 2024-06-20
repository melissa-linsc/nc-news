import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useState } from 'react';
import { patchCommentVotes } from '../utils/api';

export function CommentVotes({comment}) {
    const [votes, setVotes] = useState(comment.votes)
    const [errorMessage, setErrorMessage] = useState('')

    function handleUpvoteClick() {
        const updatedVotes = votes + 1
        setVotes(updatedVotes)

        const newVotes = {
            inc_votes: 1
        }

        patchCommentVotes(comment.comment_id, newVotes).then((comment) => {
            setVotes(comment.votes)
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

        patchCommentVotes(comment.comment_id, newVotes).then((comment) => {
            setVotes(comment.votes)
        })
        .catch((err) => {
            setErrorMessage('Error voting, please try again later')
            setVotes(votes)
        })
    }

    return (
        <section className="flex">
            Votes: {votes}
            <div className="px-4">
                <ThumbUpIcon className="vote-button mx-2 hover:text-black dark:text-white dark:hover:text-red-500 hover:cursor-pointer" onClick={() => handleUpvoteClick()}></ThumbUpIcon>
                <ThumbDownIcon className="vote-button
                hover:text-black dark:text-white
                dark:hover:text-red-500 hover:cursor-pointer" onClick={() => {
                    handleDownvoteClick()
                }}></ThumbDownIcon>
            </div>
            <p>{errorMessage}</p>
        </section>
    )
}