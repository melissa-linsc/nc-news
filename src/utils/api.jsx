import axios from "axios";

const ncNews = axios.create({baseURL: 'https://nc-news-api-ewli.onrender.com/api'})

export function getArticles() {
    return ncNews.get("/articles").then((articleData) => {
        return articleData.data.articles
    })
}

export function getArticleById(article_id) {
    return ncNews.get(`/articles/${article_id}`)
    .then((articleData) => {
        return articleData.data.article
    })
}

export function getArticleComments(article_id) {
    return ncNews.get(`/articles/${article_id}/comments`)
    .then((articleData) => {
        return articleData.data.comments
    })
}

export function patchArticleVotes(article_id, newVotes) {
    return ncNews.patch(`/articles/${article_id}`, newVotes).then((patchedArticle) => {
        return patchedArticle.data.updatedArticle
    })
}
