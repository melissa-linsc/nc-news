import { getArticles, getTopics, getTotalArticles } from "../utils/api";
import { capitaliseStr } from "../utils/capitaliseStr";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserProvider";
import { ArticleCard } from "./ArticleCard";
import '../styles/Articles.css'
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CircularProgress, Pagination, Alert } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PageNotFound } from "./PageNotFound";
import { ArticlePagination } from "./ArticlePagination";
import { FloatingActionBtn } from "./FloatingActionBtn";

export function Articles({articles, setArticles, page, setPage}) {

    const { currentUser } = useContext(UserContext)

    const [isLoading, setIsLoading] = useState(true)

    const [totalArticles, setTotalArticles] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [searchParams, setSearchParams] = useSearchParams()

    const [error, setError] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    const [showAlertMessage, setShowAlertMessage] = useState(false)

    const sortOption = searchParams.get("sort_by") || "created_at"
    const orderOption = searchParams.get("order") || "desc"
    const pageOption = searchParams.get("p") || 1

    const [sortbyInput, setSortByInput] = useState(sortOption)
    const [orderInput, setOrderInput] = useState(orderOption)

    const {topic} = useParams()

    useEffect(() => {

        getTotalArticles(topic).then((total) => {
            setTotalArticles(total)
            setTotalPages(Math.ceil(total / 10))
        })

        getArticles(topic, sortOption, orderOption, page).then((articles) => {
            setError(false)
            setArticles(articles)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
        })
    }, [topic, sortbyInput, orderInput, page])

    if (error) {
        return <PageNotFound />
    }

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="primary" />                
            </div>
        )
    }

    function handleSortChange(event) {
        setSortByInput(event.target.value)
        setSearchParams({sort_by: event.target.value, order: orderOption})
    }

    function handleOrderChange(event) {
        setOrderInput(event.target.value)
        setSearchParams({sort_by: sortOption, order: event.target.value})
    }


    return (
        <section className="articles-page">
             { showAlertMessage && !alertMessage.includes('Error') && alertMessage ? <Alert icon={<CheckIcon fontSize="inherit" />} severity="success" className="alert-message">
            {alertMessage}
            </Alert> : null }
            { showAlertMessage && alertMessage.includes('Error') && alertMessage ? <Alert severity="error" className="alert-message">
                {alertMessage}
            </Alert> : null }  
            <div className='article-header '>
                { topic ? <h2 id="articles-title">{capitaliseStr(topic)} </h2> : <h2 id="articles-title" >All Articles</h2>}
                <div className='query-forms'>
                <FormControl variant="standard" sx={{ minWidth: 100 }} id='select-sortby' className="formControl">
                <InputLabel  id='sortby-label' className="dark:text-[#f8f8f2]"
                >Sort By</InputLabel>
                <Select
                    className='select-form dark:text-[#f8f8f2] dark:border-red-400'
                    labelId="sortby-label"
                    id="sortby-input"
                    name="sortby"
                    label="sortby"
                    onChange={handleSortChange}
                    value={sortbyInput}
                >
                    <MenuItem value="created_at" >Date</MenuItem>
                    <MenuItem value="title" >Title</MenuItem>
                    <MenuItem value="votes">Votes</MenuItem>
                    <MenuItem value="author" >Author</MenuItem>
                    <MenuItem value="topic">Topic</MenuItem>
                    <MenuItem value="comment_count">Comments</MenuItem>
                </Select>
                </FormControl>
                <FormControl sx={{minWidth: 100 }} variant="standard" className='order-form'>
                <InputLabel className="dark:text-[#f8f8f2]" id="order-label"
               >Order</InputLabel>
                <Select
                    className='select-form dark:text-[#f8f8f2]'
                    labelId="order-label"
                    id="order-input"
                    name="order"
                    label="order"
                    onChange={handleOrderChange}
                    value={orderInput}
                >
                    <MenuItem value="desc" >Descending</MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                </Select>
                </FormControl>
                </div>
            </div>
            <ul className="px-[1rem]">
                {articles.map((article) => {
                    return (<div key={article.article_id}>
                        <ArticleCard article={article} articles={articles} setArticles={setArticles} setAlertMessage={setAlertMessage} setShowAlertMessage={setShowAlertMessage} className='article-card'/>
                    </div>)
                })}
            </ul>
            <ArticlePagination page={page} setPage={setPage} topic={topic} totalPages={totalPages}/>
            <div className='fixed bottom-5 right-5 p-[1rem]'>
                <FloatingActionBtn/>
            </div> 
        </section>
    )
  
}