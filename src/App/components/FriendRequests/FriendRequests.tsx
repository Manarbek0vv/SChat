import { FC, useState } from "react";
import classes from './FriendRequests.module.scss'
import { Link, Route, Routes } from "react-router-dom";
import AllIncomingRequests from "../AllIncomingRequests/AllIncomingRequests";
import AllOutgoingRequests from "../AllOutgoingRequests/AllOutgoingRequests";

type LinkType = {
    path: string;
    title: string;
}

const Links: LinkType[] = [
    { path: '', title: 'Incoming' },
    { path: 'outgoing', title: 'Outgoing' }
]

const FriendRequests: FC = () => {
    const [activeTab, setActiveTab] = useState(Links[0].path)

    return (
        <div className={classes.container}>
            <div className={classes.links}>
                {Links.map((link: LinkType) => {
                    return (
                        <Link key={link.path} to={link.path} className={activeTab === link.path ? classes['active__link'] : classes.link}
                            onClick={() => setActiveTab(link.path)}>
                            {link.title}
                        </Link>
                    )
                })}
            </div>
            <Routes>
                <Route path="" element={<AllIncomingRequests />} />
                <Route path="outgoing" element={<AllOutgoingRequests />} />
            </Routes>
        </div>
    )
}

export default FriendRequests