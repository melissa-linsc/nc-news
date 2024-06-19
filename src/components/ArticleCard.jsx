import * as React from 'react';

export function ArticleCard({article}) {
    const createdAt = article.created_at
    const date = createdAt.substring(0,10)

  return (
    <div className="card min-w-[18rem] max-w-[23rem] h-[22rem] bg-base-100 shadow-xl my-7 mx-3 overflow-hidden">
      <figure className='h-[8rem]' ><img src={article.article_img_url} alt="article-image"/></figure>
      <div className="card-body px-4 py-4">
        <h2 className="card-title overflow-hidden">
          {article.title}
        </h2>
        <p className="overflow-hidden"> By {article.author}<span className="ml-4 overflow-hidden">{date}</span></p>
        <div className="card-actions justify-end overflow-hidden pb-2">
          <div className="badge badge-outline overflow-hidden px-3 py-3">Votes: {article.votes}</div> 
          <div className="badge badge-outline overflow-hidden px-3 py-3">Comments: {article.comment_count}</div>
          <div className="badge overflow-hidden bg-[#DD3232] border-[#DD3232] text-white px-3 py-3">{article.topic}</div>
        </div>
      </div>
    </div>
  );
}