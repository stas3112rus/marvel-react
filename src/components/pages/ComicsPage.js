import {Helmet} from "react-helmet";

import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {

    return(
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list Marvel comics"
                    />
                <title>Marvel comics page</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;