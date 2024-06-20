import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";

export function PagePagination({page, setPage, topic, totalPages}) {

    function handlePage(page) {
        setPage(page)
    }

    return (
        <section className="flex justify-center">
            { topic ? <Pagination count={totalPages} className="py-5 pb-10 dark:text-[#f8f8f2]" onChange={(event, value) => handlePage(value)} color='primary' 
            page={page}/> : <Pagination count={totalPages} color="primary" className="py-5 pb-10 dark:text-white" onChange={(event, value) => handlePage(value)}
            page={page}/>  }
        </section>
    )
}