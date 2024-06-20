import {CircularProgress} from '@mui/material';
import { Button } from '@mui/material';
import { getTopics } from '../utils/api';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "./UserProvider";
import { postArticle } from '../utils/api';
import CheckIcon from '@mui/icons-material/Check';
import { Alert }from '@mui/material';


export function PostArticle({articles, setArticles}) {

    const { currentUser } = useContext(UserContext)

    if (!currentUser.username) {
        return <h2 className="text-center font-bold text-[1.3rem]">Login to post an article</h2>
    }

    const [topics, setTopics] = useState([])
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const [isLoading, setIsLoading] = useState(true)

    const [newArticleInput, setNewArticleInput] = useState({author:currentUser.username, title:'', body:'', topic:'coding', article_img_url:''})

    useEffect(() => {
        getTopics().then((topicsArr) => {
            setTopics(topicsArr)
            setIsLoading(false)
        })
    })

    function handleChange(event) {
        setNewArticleInput({...newArticleInput, [event.target.name] : event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault()
        const newArticle = newArticleInput

        setNewArticleInput({author:currentUser.username, title:'', body:'', topic:'coding', article_img_url:''})

        postArticle(newArticle).then((article)=> {
            setAlertMessage('Article Posted!')
            setShowAlertMessage(true)
               setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
            setArticles([article, ...articles])
        }).catch((err) => {
            setAlertMessage('Error posting article, please try again later')
            setShowAlertMessage(true)
            setTimeout(() => {
                setShowAlertMessage(false)
            }, 4000)
        })

    }

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="primary" />                
            </div>
        )
    }

    return (
        <section className="flex flex-col place-items-center">
            { showAlertMessage && !alertMessage.includes('Error') && alertMessage ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="alert-message">
            {alertMessage}
            </Alert> : null }
            { showAlertMessage && alertMessage.includes('Error') && alertMessage ? <Alert severity="error" className="alert-message">
                {alertMessage}
            </Alert> : null }
            <h2 className="font-bold text-[1.5rem] pb-5">New Article</h2>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs border-[#DD3232]" maxLength="75"
                onChange={handleChange}
                name="title"
                required
                value={newArticleInput.title}
                />
                <label className="mt-5">Article</label>
                <textarea className="textarea textarea-lg w-[90vw] h-[20rem] max-w-xs border-[#DD3232] mb-7" placeholder="Article"
                onChange={handleChange}
                name="body"
                required
                value={newArticleInput.body}
                >
                </textarea>
                <select className="p-2 border-[#DD3232]"
                onChange={handleChange}
                name="topic"
                value={newArticleInput.topic}>
                    {topics.map((topic) => {
                        return  <option value={topic.slug}
                        key={topic.slug}>{topic.slug}</option>
                    })}
                </select>
                <label className="mt-5">Image URL</label>
                <input type="url" placeholder="Image URL" className="input input-bordered w-full max-w-xs border-[#DD3232]" maxLength="75"
                onChange={handleChange}
                name="article_img_url"
                value={newArticleInput.article_img_url}
                />
                <Button type="submit" variant="contained"
                className='mt-5' >Post</Button>
            </form>
        </section>
    )
}