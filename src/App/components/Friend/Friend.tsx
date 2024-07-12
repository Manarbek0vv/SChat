import { Dispatch, FC, SetStateAction, useState } from "react";
import classes from './Friend.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { LuMessageCircle } from "react-icons/lu";
import { removeFromFriends } from "../../store/thunk/removeFromFriends";

type AllFriendsProps = {
    friend: UserState;
    setError: Dispatch<SetStateAction<string | null>>
}

const Friend: FC<AllFriendsProps> = ({ friend, setError }) => {
    const { user: myUser } = useAppSelector(value => value.user)
    const dispatch = useAppDispatch()
    const [isOptionVisible, setIsOptionVisible] = useState(false)

    return (
        <div key={friend.uid} className={classes.friend}>
            <div className={classes.first}>
                <div className={classes.icon}><img style={{ maxWidth: '75px', maxHeight: '75px' }} src={friend.avatar as string} className={classes.avatar} /></div>
                <div className={classes.info}>
                    <h1 className={classes.username}>{friend.username}</h1>
                    <h2 className={classes.email}>{friend.email}</h2>
                </div>
            </div>
            <div className={classes.buttons}>
                <LuMessageCircle className={classes.message} />
                <div className={classes.bats}
                    onClick={() => setIsOptionVisible(prev => !prev)}>
                    ...
                    <div className={classes.options}
                        style={isOptionVisible ? { opacity: 1, visibility: "visible" } : {}}>
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