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

type UserPageHeaderProps = {
    user: UserState;
}

const UserPageHeader: FC<UserPageHeaderProps> = ({ user }) => {
    const { user: myUser } = useAppSelector(value => value.user)
    const dispatch = useAppDispatch()

    const [error, setError] = useState<string | null>(null)

    const addToFriendHandler = () => {
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

    if (!myUser || !user) {
        return <FullScreenLoader />
    }

    return (
        <>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.best}>
                {user?.avatar && <div className={classes.background}><div className={classes.inner} style={{ backgroundImage: `url(${user.avatar})` }}></div></div>}

                <div className={classes.first}>
                    <div className={classes.icon}>
                        {user?.avatar && <img src={user.avatar} alt="" className={classes.inner} />}
                    </div>

                    <div className={classes.info}>
                        <h1 className={classes.username}>{user.username}</h1>
                        <h2 className={classes.email}>{user.email}</h2>
                    </div>
                </div>

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
        </>
    )
}
export default UserPageHeader