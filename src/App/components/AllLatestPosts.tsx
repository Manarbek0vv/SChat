import { FC } from "react";
import AllPosts from "./AllPosts/AllPosts";
import { fetchLatestPosts } from "../store/thunk/fetchLatestPosts";
import { useAppSelector } from "../hooks/redux";
import { UserState } from "../store/reducers/userSlice";

const AllLatestPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)
    
    return (
        <AllPosts callback={() => fetchLatestPosts(user as UserState)}  />
    )
}

export default AllLatestPosts