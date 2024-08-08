import { FC, useState } from "react";
import ControlCreate from "./MyPosts/MyPosts";
import AllPosts from "./AllPosts/AllPosts";
import { fetchMyPosts } from "../store/thunk/fetchMyPosts";
import { UserState } from "../store/reducers/userSlice";
import { useAppSelector } from "../hooks/redux";
import { getMyPostsCount } from "../secondaryFunctions/getMyPostsCount";

const MyPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <ControlCreate setIsCreatorOpen={setIsCreatorOpen}/>
            <AllPosts
                isCreatorOpen={isCreatorOpen}
                setIsCreatorOpen={setIsCreatorOpen}
                fetchPosts={
                    (
                        offset: any,
                        setOffset: React.Dispatch<React.SetStateAction<any>>
                    ) => {
                        return fetchMyPosts(user as UserState, offset, setOffset)
                    }}
                getPostsCount={getMyPostsCount} />
        </>
    )
}

export default MyPosts