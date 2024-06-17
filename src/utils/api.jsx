import axios from "axios";

const ncNews = axios.create({baseURL: 'https://nc-news-api-ewli.onrender.com/api'})

export function getArticles() {
    return ncNews.get("/articles").then((articleData) => {
        return articleData.data.articles
    })
}
