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

export function postComment(article_id, newComment) {
    return ncNews.post(`/articles/${article_id}/comments`, newComment).then((patchedArticle) => {
        return patchedArticle.data.comment
    })
}

export function getUsers() {
    return ncNews.get(`/users`)
    .then((users) => {
        return users.data.users
    })
}

export function deleteComments(comment_id) {
    return ncNews.delete(`/comments/${comment_id}`)
    .catch(error => {
        console.error(error);
    });
}
