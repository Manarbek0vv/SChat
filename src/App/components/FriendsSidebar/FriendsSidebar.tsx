import { FC, useState } from "react";
import classes from './FriendsSidebar.module.scss'
import { Link } from "react-router-dom";
import { IoCheckmark } from "react-icons/io5";

type LinkType = {
    path: string;
    title: string;
}

const Links: LinkType[] = [
    { path: '', title: 'My friends' },
    { path: 'friend-requests', title: 'Friend requests' }
]

const FriendsSidebar: FC = () => {
    const [ activeTab, setActiveTab ] = useState(Links[0].path)

    return (
        <div className={classes.container}>
            {Links.map((link: LinkType) => {
                return <Link key={link.path} to={link.path} 
                className={activeTab === link.path ? classes['active__link'] : classes.link} 
                onClick={() => setActiveTab(link.path)}>
                    {link.title}
                    {activeTab === link.path && <IoCheckmark className={classes.check} />}
                    </Link>
            })}
        </div>
    )
}

export default FriendsSidebar