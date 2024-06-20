import { Pagination } from "@mui/material"

export function CommentPagination() {

    return (
        <section className="">
            <Pagination count={2} className="py-5 pb-10 dark:text-[#f8f8f2]" color='primary' 
            /> 
        </section>
    )
}