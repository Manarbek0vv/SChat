import { FC } from "react";
import classes from './Friends.module.scss'
import FriendsSidebar from "../FriendsSidebar/FriendsSidebar";
import { Route, Routes } from "react-router-dom";
import FriendList from "../FriendList/FriendList";
import FriendRequests from "../FriendRequests/FriendRequests";

const Friends: FC = () => {

    return (
        <div className={classes.container}>
            <Routes>
                <Route path="/*" element={<FriendList />} />
                <Route path="friend-requests/*" element={<FriendRequests />} />
            </Routes>
            <FriendsSidebar />
        </div>
    )
}

export default Friends