import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from './FriendOnline.module.scss'
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { LuMessageCircle } from "react-icons/lu";
import { getFriends } from "../../secondaryFunctions/getFriends";
import Loader from "../../UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { startNewChat } from "../../secondaryFunctions/startNewChat";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";

type FriendsOnlineType = {
    friends: UserState[];
    setFriends: Dispatch<SetStateAction<UserState[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const FriendsOnline: FC<FriendsOnlineType> = ({ friends, setFriends }) => {
    const { user } = useAppSelector(value => value.user)
    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user?.friends) return

        setLoading(true)
        getFriends(user)
            .then((data: UserState[]) => {
                setFriends(data.filter(user => (user.state as string) === 'online'))
                setLoading(false)
            })
    }, [])

    const startNewChatHandler = (friend: UserState) => {
        startNewChat({ myUser: user as UserState, user: friend, navigate, setError })
    }

    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
            {loading && <div className={classes.loader}><Loader styles={{ width: '50px', BsBorderWidth: '2px' }} /></div>}

            {!loading && !friends.length && (
                <h1 className={classes.notfound}>No friends found</h1>
            )}

            {!loading && friends.map((friend: UserState) => {
                return (
                    <div key={friend.uid} className={classes.friend}>
                        <div className={classes.first}>
                            <div className={classes.avatar}
                                onClick={() => navigate(`/${friend.uid}`)}>
                                {friend.avatar && friend.avatar.startsWith('http') ?
                                    <img src={friend.avatar} alt="" className={classes.inner} /> :
                                    <img src="/default.png" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                                <div className={`${classes['is-online']} ${friend.state !== 'online' && classes.offline}`} />
                            </div>
                            <div className={classes.info}>
                                <h1 className={classes.username}
                                    onClick={() => navigate(`/${friend.uid}`)}>
                                    {friend.username}
                                </h1>
                                <h2 className={classes.email}>{friend.email}</h2>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <LuMessageCircle className={classes.message}
                                onClick={() => startNewChatHandler(friend)} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FriendsOnline