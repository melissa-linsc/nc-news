import * as React from 'react';
import { UserContext } from './UserProvider';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDelete } from './ConfirmDelete';

export function ArticleCard({article, articles, setArticles, setAlertMessage, setShowAlertMessage}) {
    const createdAt = article.created_at
    const date = createdAt.substring(0,10)

    const { currentUser } = useContext(UserContext)

  return ( <>
    <Link to={`/articles/${article.article_id}`} className="link">
    <div className="card min-w-[18rem] max-w-[23rem] h-[22rem] bg-base-100 shadow-xl my-7 mx-5 overflow-hidden">
      <figure className='h-[8rem]' >
        <img src={article.article_img_url} alt="article-image"/>
      </figure>
      <div className="card-body px-4 py-4">
        <div className="flex justify-between">
          <h2 className="card-title overflow-hidden">
            {article.title}
          </h2>
          { currentUser.username === article.author ?  <ConfirmDelete article={article} articles={articles} setArticles={setArticles} setAlertMessage={setAlertMessage} setShowAlertMessage={setShowAlertMessage} /> : null}
        </div>
        <p className="overflow-hidden"> By {article.author}<span className="ml-4 overflow-hidden">{date}</span>
        </p>
        <div className="card-actions justify-end overflow-hidden pb-2">
          <div className="badge badge-outline overflow-hidden px-3 py-3">Votes: {article.votes}</div> 
          <div className="badge badge-outline overflow-hidden px-3 py-3">Comments: {article.comment_count}</div>
          <div className="badge overflow-hidden bg-[#DD3232] border-[#DD3232] text-white px-3 py-3">{article.topic}
          </div>
        </div>
      </div>
    </div>
    </Link>
    </>
  );
}