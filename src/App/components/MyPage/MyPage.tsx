import { FC } from "react";
import classes from './MyPage.module.scss'
import MyPageInfo from "../MyPageInfo/MyPageInfo";
import MyPageHeader from "../MyPageHeader/MyPageHeader";
import MyPosts from "../MyPosts";

const MyPage: FC = () => {

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                <MyPageHeader />

                <MyPageInfo />

                <MyPosts />
            </div>
        </div>
    )
}

export default MyPage