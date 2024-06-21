import {CircularProgress} from '@mui/material';
import { Button } from '@mui/material';
import { getTopics } from '../utils/api';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "./UserProvider";
import { postArticle } from '../utils/api';
import CheckIcon from '@mui/icons-material/Check';
import { Alert }from '@mui/material';


export function PostArticle({articles, setArticles}) {

    const { currentUser } = useContext(UserContext)

    if (!currentUser.username) {
        return( <div className="flex flex-col justify-center p-[2rem]">
              <h2 className="text-center font-bold text-[1.3rem] py-[2rem]">Login to post an article</h2>
              <Link to='/users' className="max-w-[20rem] m-auto"><button className="p-[1rem] rounded-lg bg-[#DD3232] text-white">Login</button></Link>
        </div>
        )
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
            <form className="flex flex-col w-[80vw]" onSubmit={handleSubmit}>
                <label>Title *</label>
                <input type="text" placeholder="Title" className="input input-bordered border-[#DD3232]  border-2" maxLength="75"
                onChange={handleChange}
                name="title"
                required
                value={newArticleInput.title}
                />
                <label className="mt-5">Article *</label>
                <textarea className="textarea textarea-lg h-[20rem] border-[#DD3232] mb-7  border-2" placeholder="Article"
                onChange={handleChange}
                name="body"
                required
                value={newArticleInput.body}
                >
                </textarea>
                <label>Topic</label>
                <select className="p-2 border-[#DD3232] border-2 rounded-lg dark:bg-[#282a36]"
                onChange={handleChange}
                name="topic"
                value={newArticleInput.topic}>
                    {topics.map((topic) => {
                        return  <option value={topic.slug}
                        key={topic.slug}>{topic.slug}</option>
                    })}
                </select>
                <label className="mt-5">Image URL</label>
                <input type="url" placeholder="Image URL" className="input input-bordered border-[#DD3232]  border-2 mb-8" maxLength="75"
                onChange={handleChange}
                name="article_img_url"
                value={newArticleInput.article_img_url}
                />
                <button type="submit" 
                className='mb-[3rem] p-3 rounded-lg bg-[#DD3232] text-white' >Post</button>
            </form>
        </section>
    )
}