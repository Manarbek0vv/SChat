import { FC } from "react";
import classes from './MyPage.module.scss'
import MyPageInfo from "../MyPageInfo/MyPageInfo";
import MyPageHeader from "../MyPageHeader/MyPageHeader";
import MyPosts from "../MyPosts";

const MyPage: FC = () => {

    return (
        <div className={classes.container}>
            <MyPageHeader />

            <MyPageInfo />

            <MyPosts />
        </div>
    )
}

export default MyPage