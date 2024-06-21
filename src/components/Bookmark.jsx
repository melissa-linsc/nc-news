import { ArticleCard } from "./ArticleCard"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

export function Bookmark({bookmarked, setBookmarked}) {
    
    if (!bookmarked.length) {
        return (<section className="No-articles-bookmarked flex justify-center items-center flex-col ">
            <h2>No articles bookmarked yet...</h2>
            <Link to='/' className='link-to-home'><Button variant="contained" >Browse Articles</Button></Link>
                 </section>)
    }
    
    return (
        <>
            <h2 className="text-center font-bold text-xl">Bookmarked Articles</h2>
            <ul>
                {bookmarked.map((article) => {
                    return <ArticleCard article={article} key={article.article_id} className='article-card'/>
                })}
            </ul>
        </>
    )
}