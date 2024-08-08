import { FC } from "react";
import { useAppSelector } from "../hooks/redux";
import { fetchFriendPosts } from "../store/thunk/fetchFriendPosts";
import { UserState } from "../store/reducers/userSlice";
import AllPosts from "./AllPosts/AllPosts";
import { getFriendPostsCount } from "../secondaryFunctions/getFriendPostsCount";

const AllFriendPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)

    return (
        <AllPosts
            fetchPosts={
                (
                    offset: any,
                    setOffset: React.Dispatch<React.SetStateAction<any>>
                ) => {
                    return fetchFriendPosts(user as UserState, offset, setOffset)
                }}
            getPostsCount={getFriendPostsCount} />)
}

export default AllFriendPosts