import { FC } from "react";
import AllPosts from "./AllPosts/AllPosts";
import { fetchLatestPosts } from "../store/thunk/fetchLatestPosts";
import { useAppSelector } from "../hooks/redux";
import { UserState } from "../store/reducers/userSlice";
import { getLatestPostsCount } from "../secondaryFunctions/getLatestPostsCount";

const AllLatestPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)
    
    return (
        <AllPosts
            fetchPosts={
                (
                    offset: any,
                    setOffset: React.Dispatch<React.SetStateAction<any>>
                ) => {
                    return fetchLatestPosts(user as UserState, offset, setOffset)
                }}
            getPostsCount={getLatestPostsCount} />
    )
}

export default AllLatestPosts