import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { fetchFriendPosts } from "../store/thunk/fetchFriendPosts";
import { UserState } from "../store/reducers/userSlice";
import AllPosts from "./AllPosts/AllPosts";

const AllFriendPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)
    
    return (
        <AllPosts callback={() => fetchFriendPosts(user as UserState)}  />
    )
}

export default AllFriendPosts