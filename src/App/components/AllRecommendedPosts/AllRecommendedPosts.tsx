import { FC } from "react";
import AllPosts from "../AllPosts/AllPosts";
import { fetchRecommendedPosts } from "../../store/thunk/fetchRecommendedPosts";
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";

const AllRecommendedPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)
    
    return (
        <AllPosts callback={() => fetchRecommendedPosts(user as UserState)}  />
    )
}

export default AllRecommendedPosts