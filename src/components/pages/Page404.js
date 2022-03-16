import ErrorMessage from "../errrorMessage/ErrorMessage"
import { Link } from "react-router-dom"

const Page404 = ()=>{
    return (
        <div>
            <ErrorMessage/>
            <h1>Page is not found</h1>
            <Link to='/'>Back to main page</Link>
        </div>
    )
}

export default Page404;

