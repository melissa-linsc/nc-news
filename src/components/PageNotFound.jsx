import { Link } from "react-router-dom";
import { Button } from "@mui/material";

export function PageNotFound() {

    return (<section className="page-not-found">
        <h2 className="not-found">404: Page Not Found</h2>
        <Link to='/' className='link-to-home'><Button variant="contained" >Go to Homepage</Button></Link>
    </section>)
}