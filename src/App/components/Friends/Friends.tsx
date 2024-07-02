import { FC } from "react";
import classes from './Friends.module.scss'
import FriendsSidebar from "../FriendsSidebar/FriendsSidebar";
import { Route, Routes } from "react-router-dom";
import FriendList from "../FriendList/FriendList";

const Friends: FC = () => {

    return (
        <div className={classes.container}>
            <Routes>
                <Route path="/*" element={<FriendList />} />
                <Route path="friend-requests" element={<div style={{color: 'white'}}>Hello request!</div>} />
            </Routes>
            <FriendsSidebar />
        </div>
    )
}

export default Friends