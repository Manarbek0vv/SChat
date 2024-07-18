import { FC } from "react";
import AllPosts from "./AllPosts/AllPosts";
import { fetchLatestPosts } from "../store/thunk/fetchLatestPosts";

const AllLatestPosts: FC = () => {
    
    return (
        <AllPosts callback={() => fetchLatestPosts()}  />
    )
}

export default AllLatestPosts