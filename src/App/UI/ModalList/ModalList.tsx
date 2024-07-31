import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import classes from './ModalList.module.scss';
import { IoMdClose } from "react-icons/io";
import { UserState } from "../../store/reducers/userSlice";
import { GoDotFill } from "react-icons/go";
import { getUserByUid } from "../../secondaryFunctions/getUserByUid";
import { useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton/Skeleton";
import { useAppSelector } from "../../hooks/redux";

interface ModalListProps {
    children: React.ReactNode | React.ReactChild;
    setIsModalListVisible: React.Dispatch<React.SetStateAction<boolean>>;
    usersUid: string[];
    myUser: UserState;
}

const ModalList: FC<ModalListProps> = (props) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const [users, setUsers] = useState<UserState[]>([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const fetchUsers = async () => {
        const gettingUsers = []

        for (const uid of props.usersUid) {
            const gettingUser = await getUserByUid({ uid })
            gettingUsers.push(gettingUser)
        }

        return gettingUsers
    }

    useEffect(() => {
        setLoading(true)
        fetchUsers()
            .then(response => setUsers(response))
            .finally(() => setLoading(false))
    }, [])

    return (
        createPortal(
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <div className={classes.header}>
                        <h1 className={classes.title}>
                            {props.children}
                        </h1>

                        <IoMdClose
                            onClick={() => props.setIsModalListVisible(false)}
                            className={classes.close} />
                    </div>

                    {!props.usersUid.length && (
                        <div className={classes.notfound}>
                            No friends found
                        </div>
                    )}

                    {!!props.usersUid.length &&
                        (
                            <div className={classes['list-wrapper']}>
                                <div className={classes.list}>
                                    {!loading && users.map(user => {
                                        return (
                                            <div key={user.uid} className={classes.user}
                                                onClick={() => {
                                                    if (user.uid === props.myUser.uid) {
                                                        return
                                                    }
                                                    navigate(`/${user.uid}`)
                                                }}>
                                                <div className={classes.avatar}>
                                                    {user.avatar && (
                                                        <img src={user.avatar} alt="" className={classes.inner} />
                                                    )}
                                                </div>

                                                <div className={classes.main}>
                                                    <p className={classes.username}>
                                                        {user.username}
                                                    </p>

                                                    <p className={classes.info}>
                                                        {
                                                            !!user.friends.length ?
                                                                user.friends.length === 1 ?
                                                                    '1 friend' :
                                                                    `${user.friends.length} friends` :
                                                                'no friends'
                                                        }
                                                        {
                                                            (user.isClosedAccount && !user.friends.includes(props.myUser.uid)) &&
                                                                user.uid !== myUser?.uid ?
                                                                '' :
                                                                <>
                                                                    <GoDotFill className={classes.dot} />
                                                                    {
                                                                        user.posts.length === 1 ?
                                                                            '1 post' :
                                                                            `${user.posts.length} posts`
                                                                    }
                                                                </>
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    })}

                                    {loading && <Skeleton />}
                                </div>
                            </div>
                        )}
                </div>
            </div>,
            document.getElementById('modal') as HTMLDivElement
        )
    )
}

export default ModalList