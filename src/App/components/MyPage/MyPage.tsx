import { FC, useState } from "react";
import classes from './MyPage.module.scss'
import MyPageInfo from "../MyPageInfo/MyPageInfo";
import MyPosts from "../MyPosts/MyPosts";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import MyPageHeader from "../MyPageHeader/MyPageHeader";
import AllPosts from "../AllPosts/AllPosts";
import { fetchMyPosts } from "../../store/thunk/fetchMyPosts";
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";

const MyPage: FC = () => {
    const { user } = useAppSelector(value => value.user)
    const [ isCreaterOpen, setIsCreateOpen ] = useState(false)

    return (
        <div className={classes.container}>
            <MyPageHeader />

            <MyPageInfo />

            <MyPosts setIsCreatorOpen={setIsCreateOpen} />

            {isCreaterOpen && <CreateNewPost setIsCreatorOpen={setIsCreateOpen} />}

            <AllPosts callback={fetchMyPosts(user as UserState)} />
        </div>
    )
}

export default MyPage