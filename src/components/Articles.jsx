import { getArticles, getTopics } from "../utils/api";
import { capitaliseStr } from "../utils/capitaliseStr";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import '../styles/Articles.css'
import { Link, useParams, useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { PageNotFound } from "./PageNotFound";

export function Articles() {

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()

    const [error, setError] = useState(false)

    const sortOption = searchParams.get("sort_by") || "created_at"
    const orderOption = searchParams.get("order") || "desc"

    const [sortbyInput, setSortByInput] = useState(sortOption)
    const [orderInput, setOrderInput] = useState(orderOption)

    const {topic} = useParams()

    useEffect(() => {
        getArticles(topic, sortOption, orderOption).then((articles) => {
            setError(false)
            setArticles(articles)
            setIsLoading(false)
        })
        .catch((err) => {
            setError(true)
        })
    }, [topic, sortbyInput, orderInput])

    if (error) {
        return <PageNotFound />
    }

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="secondary" />                
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
            <div className='article-header '>
                { topic ? <h2 id="articles-title">{capitaliseStr(topic)} </h2> : <h2 id="articles-title" >All Articles</h2>}
                <div className='query-forms'>
                <FormControl variant="standard" sx={{ minWidth: 100 }} id='select-sortby'  >
                <InputLabel labeld="sortby-input" className="dark:text-[#f8f8f2]">Sort By</InputLabel>
                <Select
                    className='select-form dark:text-[#f8f8f2] dark:border-red-400'
                    labelId="sortby-input"
                    id="sortby-input"
                    label="sortby"
                    onChange={handleSortChange}
                    value={sortbyInput}
                >
                    <MenuItem value="created_at">Date</MenuItem>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="votes">Votes</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="topic">Topic</MenuItem>
                    <MenuItem value="comment_count">Comments</MenuItem>
                </Select>
                </FormControl>
                <FormControl sx={{minWidth: 100 }} variant="standard" className='order-form'>
                <InputLabel className="dark:text-[#f8f8f2]">Order</InputLabel>
                <Select
                    className='select-form dark:text-[#f8f8f2]'
                    labelId="order-input"
                    id="order-input"
                    label="order"
                    onChange={handleOrderChange}
                    value={orderInput}
                >
                    <MenuItem value="desc">Descending</MenuItem>
                    <MenuItem value="asc">Ascending</MenuItem>
                </Select>
                </FormControl>
                </div>
            </div>
            <ul className="px-[1rem]">
                {articles.map((article) => {
                    return <Link to={`/articles/${article.article_id}`} key={article.article_id} className="link"><ArticleCard article={article} className='article-card'/></Link>
                })}
            </ul>
        </section>
    )
  
}