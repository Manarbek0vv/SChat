import { FC } from "react";
import classes from './Sidebar.module.scss'
import { FaRegCircleUser } from "react-icons/fa6";
import { BsPersonAdd } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import { useAppSelector } from "../../hooks/redux";
import { Link } from "react-router-dom";

type LinkType = {
    icon: React.ReactNode | React.ReactChild;
    title: string;
    url: string;
}

const Links: LinkType[] = [
    {
        icon: <FaRegCircleUser />,
        title: 'My page',
        url: 'mypage'
    },
    {
        icon: <BsPersonAdd />,
        title: 'Add friends',
        url: 'friends',
    },
    {
        icon: <HiOutlineChatBubbleLeftRight />,
        title: 'Chats',
        url: 'chats',
    },
    {
        icon: <IoMdSettings />,
        title: 'Settings',
        url: 'settings'
    }
]


const Sidebar: FC = () => {
    const { user } = useAppSelector(value => value.user)

    const newUsername = user?.username.slice(0, 10) + ((user?.username as string).length > 9 ? '...' : '')
    const newEmail = user?.email.slice(0, 10) + ((user?.email as string).length > 9 ? '...' : '')

    return (
        <div className={classes.container}>
            <div className={classes.first}>
                <div className={classes.profile}>
                    <div className={classes.icon}></div>
                    <div className={classes.info}>
                        <h1 className={classes.username}>{newUsername}</h1>
                        <h2 className={classes.email}>{newEmail}</h2>
                    </div>
                </div>

                <nav className={classes.nav}>
                    {Links.map((link: LinkType) => {
                        return (
                            <Link key={link.url} to={link.url} className={classes.link}>
                                <span className={classes.icon}>{link.icon}</span>
                                {link.title}
                            </Link>
                        )
                    })}
                </nav>
            </div>

            <div className={classes.exit}>
                <span className={classes.icon}><GiExitDoor /></span>
                Exit
            </div>
        </div>
    )
}

export default Sidebar