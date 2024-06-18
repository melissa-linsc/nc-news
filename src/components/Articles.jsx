import { getArticles } from "../utils/api";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import '../styles/Articles.css'
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export function Articles() {

    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const {topic} = useParams()

    useEffect(() => {
        getArticles(topic).then((articles) => {
            setArticles(articles)
            setIsLoading(false)
        })
    }, [topic])

    if (isLoading) {
        return (
            <div className="spinner">
                <CircularProgress color="secondary" />                
            </div>
        )
    }
   
    return (
        <>  
            <h2 id="articles-title">Articles</h2>
            <ul>
                {articles.map((article) => {
                    return <Link to={`/articles/${article.article_id}`} key={article.article_id} className="link"><ArticleCard article={article} className='article-card'/></Link>
                })}
            </ul>
        </>
    )
  
}