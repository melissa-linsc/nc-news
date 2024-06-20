import { ArticleCard } from "./ArticleCard"
import { Link } from "react-router-dom"

export function Bookmark({bookmarked, setBookmarked}) {
    
    if (!bookmarked.length) {
        return <h2 className="text-center">No articles bookmarked yet...</h2>
    }
    
    return (
        <>
            <h2 className="text-center font-bold text-xl">Bookmarked Articles</h2>
            <ul>
                {bookmarked.map((article) => {
                    return <Link to={`/articles/${article.article_id}`} key={article.article_id} className="link"><ArticleCard article={article} className='article-card'/></Link>
                })}
            </ul>
        </>
    )
}