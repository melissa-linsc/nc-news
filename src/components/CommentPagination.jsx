import { Pagination } from "@mui/material"

export function CommentPagination({currArticle, commentPage, setCommentPage}) {

    const commentPages = Math.ceil(currArticle.comment_count / 10)

    function handlePage(page) {
        setCommentPage(page)
    }

    return (
        <section className="flex justify-center">
            <Pagination count={commentPages} className="py-5 pb-10 dark:text-[#f8f8f2]" color='primary' 
            page={commentPage}
            onChange={(event, value) => handlePage(value)}
            /> 
        </section>
    )
}