import { FC } from "react";
import AllPosts from "../AllPosts/AllPosts";
import { fetchRecommendedPosts } from "../../store/thunk/fetchRecommendedPosts";
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { getRecommendedPostsCount } from "../../secondaryFunctions/getRecommendedPostsCount";

const AllRecommendedPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)

    return (
        <AllPosts
            fetchPosts={
                (
                    offset: any,
                    setOffset: React.Dispatch<React.SetStateAction<any>>
                ) => {
                    return fetchRecommendedPosts(user as UserState, offset, setOffset)
                }}
            getPostsCount={getRecommendedPostsCount} />
    )
}

export default AllRecommendedPosts