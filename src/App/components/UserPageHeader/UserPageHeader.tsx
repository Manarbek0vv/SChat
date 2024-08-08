import { FC, useState } from "react";
import classes from './UserPageHeader.module.scss'
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { UserState } from "../../store/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addToFriend } from "../../store/thunk/addToFriend";
import { removeFromFriends } from "../../store/thunk/removeFromFriends";
import { cancelRequest } from "../../store/thunk/cancelRequest";
import FullScreenLoader from "../../UI/FullScreenLoader/FullScreenLoader";
import { acceptRequest } from "../../store/thunk/acceptRequest";
import { LuMessageCircle } from "react-icons/lu";
import { startNewChat } from "../../secondaryFunctions/startNewChat";
import { useNavigate } from "react-router-dom";

type UserPageHeaderProps = {
    user: UserState;
}

const UserPageHeader: FC<UserPageHeaderProps> = ({ user }) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const addToFriendHandler = () => {
        if (myUser?.blackList.includes(user.uid)) {
            setError('The user is on your blacklist')
            return
        }
        dispatch(addToFriend({ user, setError, myUser: myUser as UserState }))
    }

    const removeFromFriendsHandler = () => {
        dispatch(removeFromFriends({ user, setError, myUser: myUser as UserState }))
    }

    const cancelRequestHandler = () => {
        dispatch(cancelRequest({ user, setError, myUser: myUser as UserState }))
    }

    const acceptRequestHandler = () => {
        dispatch(acceptRequest({ user, setError, myUser: myUser as UserState }))
    }

    const startNewChatHandler = () => {
        startNewChat({ myUser: myUser as UserState, user, navigate, setError })
    }

    if (!myUser || !user) {
        return <FullScreenLoader />
    }

    return (
        <>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.best}>
                <div className={classes.background}>
                    {user.backgroundImage && (
                        <div className={classes.inner}
                            style={{ backgroundImage: `url(${user.backgroundImage})` }} />
                    )}
                </div>

                <div className={classes.first}>
                    <div className={classes.avatar}>
                        {user.avatar && user.avatar.startsWith('http') ?
                            <img src={user.avatar} alt="" className={classes.inner} /> :
                            <img src="/default.png" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%'}} />}
                        <div className={`${classes['is-online']} ${user?.state !== 'online' && classes.offline}`} />
                    </div>

                    <div className={classes.info}>
                        <h1 className={classes.username}>{user.username}</h1>
                        <h2 className={classes.email}
                            style={!user.isEmailVisible ? { opacity: '0', userSelect: 'none', height: '10px' } : {}}>
                            {user.email}
                        </h2>
                    </div>
                </div>

                <div className={classes.end}>
                    {!user.isClosedAccount && (
                        <div className={classes.message} onClick={startNewChatHandler}>
                            <LuMessageCircle className={classes['message-pin']} />
                        </div>
                    )}

                    {!myUser.friends.includes(user.uid) &&
                        !myUser.friendRequestsSend.includes(user.uid) &&
                        !myUser.friendRequests.includes(user.uid) && (
                            <button className={classes.button} onClick={addToFriendHandler}>
                                Add to friend
                            </button>
                        )}

                    {myUser.friends.includes(user.uid) && (
                        <button className={classes.button} onClick={removeFromFriendsHandler}>
                            Remove from friends
                        </button>
                    )}

                    {!myUser.friends.includes(user.uid) &&
                        myUser.friendRequestsSend.includes(user.uid) &&
                        !myUser.friendRequests.includes(user.uid) && (
                            <button className={classes.button} onClick={cancelRequestHandler}>
                                Cancel request
                            </button>
                        )}

                    {!myUser.friends.includes(user.uid) &&
                        myUser.friendRequests.includes(user.uid) &&
                        !myUser.friendRequestsSend.includes(user.uid) && (
                            <button className={classes.button} onClick={acceptRequestHandler}>
                                Accept request
                            </button>
                        )}
                </div>
            </div>
        </>
    )
}
export default UserPageHeader