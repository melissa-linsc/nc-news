import { getArticles } from "../utils/api";
import { useState, useEffect } from "react";
import { ArticleCard } from "./ArticleCard";
import '../styles/Articles.css'

export function Articles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        getArticles().then((articles) => {
            setArticles(articles)
        })
    }, [])
   
    return (
        <>  
            <h2>Articles</h2>
            <ul>
                {articles.map((article) => {
                    return <ArticleCard article={article} key={article.article_id} className='article-card'/>
                })}
            </ul>
        </>
    )
  
}