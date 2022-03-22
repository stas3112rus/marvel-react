import ErrorMessage from "../errrorMessage/ErrorMessage"
import { Link } from "react-router-dom"
import {Helmet} from "react-helmet";

const Page404 = ()=>{
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content="Error 404"
                    />
                <title>Error 404 - we don't know about this page</title>
            </Helmet>
            <ErrorMessage/>
            <h1>Page is not found</h1>
            <Link to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;

