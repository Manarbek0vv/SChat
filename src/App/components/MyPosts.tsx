import { FC, useState } from "react";
import ControlCreate from "./MyPosts/MyPosts";
import AllPosts from "./AllPosts/AllPosts";
import { fetchMyPosts } from "../store/thunk/fetchMyPosts";
import { UserState } from "../store/reducers/userSlice";
import { useAppSelector } from "../hooks/redux";

const MyPosts: FC = () => {
    const { user } = useAppSelector(value => value.user)
    const [ isCreatorOpen, setIsCreatorOpen] = useState(false)

    return (
        <>
            <ControlCreate setIsCreatorOpen={setIsCreatorOpen} />

            <AllPosts callback={() => fetchMyPosts(user as UserState)} isCreatorOpen={isCreatorOpen} setIsCreatorOpen={setIsCreatorOpen} />
        </>
    )
}

export default MyPosts