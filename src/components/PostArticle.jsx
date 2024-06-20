import {CircularProgress} from '@mui/material';
import { Button } from '@mui/material';
import { getTopics } from '../utils/api';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from "./UserProvider";
import { postArticle } from '../utils/api';


export function PostArticle({articles, setArticles}) {

    const { currentUser } = useContext(UserContext)

    if (!currentUser.username) {
        return <h2 className="text-center font-bold text-[1.3rem]">Login to post an article</h2>
    }

    const [topics, setTopics] = useState([])
    const [successMessage, setSuccessMessage] = useState('')

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

        postArticle(newArticle).then((article)=> {
            setSuccessMessage('Article Posted!')
            setArticles([article, ...articles])
            setNewArticleInput({author:currentUser.username, title:'', body:'', topic:'coding', article_img_url:''})
        }).catch((err) => {
            setSuccessMessage('Error posting article, please try again later')
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
            <h2 className="font-bold text-[1.5rem] pb-5">New Article</h2>
            <p>{successMessage}</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" placeholder="Title" className="input input-bordered w-full max-w-xs border-[#DD3232]" maxLength="75"
                onChange={handleChange}
                name="title"
                required
                />
                <label className="mt-5">Article</label>
                <textarea className="textarea textarea-lg w-[90vw] h-[20rem] max-w-xs border-[#DD3232] mb-7" placeholder="Article"
                onChange={handleChange}
                name="body"
                required>
                </textarea>
                <select className="p-2 border-[#DD3232]"
                onChange={handleChange}
                name="topic">
                    {topics.map((topic) => {
                        return  <option value={topic.slug}
                        key={topic.slug}>{topic.slug}</option>
                    })}
                </select>
                <label className="mt-5">Image URL</label>
                <input type="url" placeholder="Image URL" className="input input-bordered w-full max-w-xs border-[#DD3232]" maxLength="75"
                onChange={handleChange}
                name="article_img_url"
                />
                <Button type="submit" variant="contained"
                className='mt-5' >Post</Button>
            </form>
        </section>
    )
}