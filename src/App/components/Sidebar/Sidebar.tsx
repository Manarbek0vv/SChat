import { FC } from "react";
import classes from './Sidebar.module.scss'
import { FaRegCircleUser } from "react-icons/fa6";
import { BsPersonAdd } from "react-icons/bs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { IoMdSettings } from "react-icons/io";
import { GiExitDoor } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { exitFromAccount } from "../../store/thunk/exitFromAccount";
import { FaHome } from "react-icons/fa";

type LinkType = {
    icon: React.ReactNode | React.ReactChild;
    title: string;
    url: string;
}

const Links: LinkType[] = [
    {
        icon: <FaHome />,
        title: 'Home',
        url: 'posts'
    },
    {
        icon: <FaRegCircleUser />,
        title: 'My page',
        url: 'mypage'
    },
    {
        icon: <BsPersonAdd />,
        title: 'Friends',
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
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const newUsername = user?.username.slice(0, 10) + ((user?.username as string).length > 9 ? '...' : '')
    const newEmail = user?.email.slice(0, 10) + ((user?.email as string).length > 9 ? '...' : '')

    const exitFromAccountHandler = () => {
        if (!user) return
        dispatch(exitFromAccount({ user }))
        navigate('')
        location.reload()
    }

    return (
        <div className={classes.container}>
            <div className={classes.first}>
                <div className={classes.profile}>
                    <div className={classes.avatar}>
                        {user?.avatar && user.avatar.startsWith('http') ? 
                        <img src={user.avatar} alt="" className={classes.inner} /> : 
                        <img src="/default.png" alt="" style={{width: '100%', height: '100%'}} />}
                    </div>
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

            <div className={classes.exit} onClick={exitFromAccountHandler}>
                <span className={classes.icon}><GiExitDoor /></span>
                <span className={classes['exit-text']}>Exit</span>
            </div>

            <div className={classes['header-background']} />
        </div>
    )
}

export default Sidebar