import axios from "axios";

const ncNews = axios.create({baseURL: 'https://nc-news-api-ewli.onrender.com/api'})

export function getArticles(topic, sortby, order, page) {
    return ncNews.get("/articles", {params: {
        topic:topic,
        sort_by: sortby,
        order: order,
        p: page
    }}).then((articleData) => {
        return articleData.data.articles
    })
}

export function getArticleById(article_id) {
    return ncNews.get(`/articles/${article_id}`)
    .then((articleData) => {
        return articleData.data.article
    })
}

export function getArticleComments(article_id, page) {
    return ncNews.get(`/articles/${article_id}/comments`, {params: {
        p: page
    }})
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
}

export function getTopics() {
    return ncNews.get("/topics").then((topics) => {
        return topics.data.topics
    })
}

export function getTotalArticles(topic) {
    return ncNews.get(`/articles`,  {params: {
        topic:topic,
        limit: 100
    }}).then((articles) => {
        return articles.data.articles.length
    })
}

export function patchCommentVotes(comment_id, newVotes) {
    return ncNews.patch(`/comments/${comment_id}`, newVotes).then((patchedComment) => {
        return patchedComment.data.updatedComment
    })
}

export function postArticle(newArticle) {
    return ncNews.post(`/articles`, newArticle).then((newArticle) => {
        return newArticle.data.newArticle
    })
}

export function deleteArticle(article_id) {
    return ncNews.delete(`/articles/${article_id}`)
}

export function postUser(newUser) {
    return ncNews.post('/users', newUser)
    .then((user) => {
        return user.data.newUser
    })
}