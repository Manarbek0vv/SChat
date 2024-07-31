import { Dispatch, FC, SetStateAction, useState } from "react";
import classes from './Friend.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { LuMessageCircle } from "react-icons/lu";
import { removeFromFriends } from "../../store/thunk/removeFromFriends";
import { useNavigate } from "react-router-dom";
import { startNewChat } from "../../secondaryFunctions/startNewChat";

type AllFriendsProps = {
    friend: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
    currentFriendID: string | null;
    changeCurrentFriendID: (id: string) => void;
}

const Friend: FC<AllFriendsProps> = ({ friend, setError, currentFriendID, changeCurrentFriendID }) => {
    const { user: myUser } = useAppSelector(value => value.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const startNewChatHandler = () => {
        startNewChat({ myUser: myUser as UserState, user: friend, navigate, setError })
    }

    return (
        <div key={friend.uid} className={classes.friend}>
            <div className={classes.first}>
                <div className={classes.icon}
                    onClick={() => navigate(`/${friend.uid}`)}>
                    {friend.avatar && <img style={{ maxWidth: '75px', maxHeight: '75px' }} src={friend.avatar as string} className={classes.avatar} />}
                </div>
                <div className={classes.info}>
                    <h1 className={classes.username}
                        onClick={() => navigate(`/${friend.uid}`)}>
                        {friend.username}
                    </h1>
                    {
                        friend.isEmailVisible && (
                            <h2 className={classes.email}>{friend.email}</h2>
                        )
                    }
                </div>
            </div>
            <div className={classes.buttons}>
                <LuMessageCircle className={classes.message} onClick={startNewChatHandler} />
                <div className={classes.bats}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.stopPropagation()
                        changeCurrentFriendID(friend.uid)
                    }}>
                    ...
                    <div className={classes.options}
                        style={currentFriendID === friend.uid ? { opacity: 1, visibility: "visible" } : {}}>
                        <div className={classes.button}
                            onClick={() => {
                                dispatch(removeFromFriends({ myUser: myUser as UserState, user: friend, setError }))
                            }}>
                            Remove from friends
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friend